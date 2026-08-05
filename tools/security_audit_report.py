#!/usr/bin/env python3
"""
Run dependency audit (npm audit) + heuristic leak scan on built JS,
then write reports/security-report-<timestamp>.html and .pdf.

Usage (from repo root):
  pip install -r tools/requirements-audit-report.txt
  python tools/security_audit_report.py

App discovery scans every existing container among:
  development_v1/product-page-apps, product-page-apps, staging (under the
  workspace folder that contains this tools/ directory).

PDF: tries xhtml2pdf first, then Chromium/Chrome/Edge headless (see pdf_from_html).
"""

from __future__ import annotations

import datetime as dt
import html as html_module
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any

from pdf_from_html import write_pdf

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
REPORTS_DIR = REPO_ROOT / "reports"


def iter_app_container_dirs(workspace: Path) -> list[Path]:
	"""Ordered app roots: nested development_v1 layout, flat product-page-apps, staging."""
	candidates = (
		workspace / "development_v1" / "product-page-apps",
		workspace / "product-page-apps",
		workspace / "staging",
	)
	out: list[Path] = []
	seen: set[Path] = set()
	for p in candidates:
		if p.is_dir():
			r = p.resolve()
			if r not in seen:
				seen.add(r)
				out.append(p)
	return out


def discover_npm_projects(root: Path) -> list[Path]:
	"""Discover Studio widget apps (ksys-*) under known app roots + BuildResult bundles."""
	out: list[Path] = []
	for apps_root in iter_app_container_dirs(root):
		for p in sorted(apps_root.iterdir()):
			if p.is_dir() and p.name.startswith("ksys-") and (p / "package.json").is_file():
				out.append(p)
	seen: set[Path] = set()
	uniq: list[Path] = []
	for p in out:
		r = p.resolve()
		if r not in seen:
			seen.add(r)
			uniq.append(p)
	return uniq


def run_npm_audit(package_dir: Path, npm_exe: str) -> tuple[dict[str, Any] | None, str]:
	try:
		proc = subprocess.run(
			[npm_exe, "audit", "--json", "--omit=dev"],
			cwd=package_dir,
			capture_output=True,
			text=True,
			timeout=600,
			check=False,
		)
	except FileNotFoundError:
		return None, f"npm not found ({npm_exe})"
	except subprocess.TimeoutExpired:
		return None, "npm audit timed out"

	raw = proc.stdout or proc.stderr or ""
	if not raw.strip():
		return None, "empty npm audit output"

	try:
		return json.loads(raw), ""
	except json.JSONDecodeError:
		return None, raw[:8000]


def parse_audit_vulnerabilities(data: dict[str, Any]) -> list[dict[str, Any]]:
	rows: list[dict[str, Any]] = []
	meta = data.get("vulnerabilities")
	if isinstance(meta, dict):
		for pkg, entry in meta.items():
			if not isinstance(entry, dict):
				continue
			sev = entry.get("severity") or "unknown"
			title = pkg
			detail = ""
			via = entry.get("via")
			if isinstance(via, list) and via:
				first = via[0]
				if isinstance(first, dict):
					title = first.get("title") or first.get("name") or title
					detail = str(first.get("url") or "")
			fix = entry.get("fixAvailable")
			rows.append(
				{
					"package": pkg,
					"severity": str(sev).lower(),
					"title": str(title),
					"detail": detail,
					"fixAvailable": json.dumps(fix) if fix is not None else "",
				},
			)

	advisories = data.get("advisories") or {}
	if isinstance(advisories, dict) and not rows:
		for adv_id, adv in advisories.items():
			if not isinstance(adv, dict):
				continue
			rows.append(
				{
					"package": adv.get("module_name") or str(adv_id),
					"severity": str(adv.get("severity") or "unknown").lower(),
					"title": str(adv.get("title") or adv_id),
					"detail": str(adv.get("url") or ""),
					"fixAvailable": "",
				},
			)

	return sorted(rows, key=lambda r: (r["severity"], r["package"]))


def audit_summary_counts(rows: list[dict[str, Any]]) -> dict[str, int]:
	counts: dict[str, int] = {}
	for r in rows:
		s = r.get("severity") or "unknown"
		counts[s] = counts.get(s, 0) + 1
	return counts


LEAK_PATTERNS: list[tuple[str, re.Pattern[bytes]]] = [
	("JWT-like blob", re.compile(rb"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b")),
	("Bearer token", re.compile(rb"Bearer\s+[A-Za-z0-9\-._~+/]+=*")),
	("AWS-like key id", re.compile(rb"\bAKIA[0-9A-Z]{16}\b")),
	("Private key PEM", re.compile(rb"-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----")),
	(
		"Quoted long hex or UUID (possible token)",
		re.compile(
			rb"[\"'](?:[a-fA-F0-9]{24,}|[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12})[\"']",
		),
	),
]

MAX_BYTES = 6 * 1024 * 1024


def scan_shipped_bundles(root: Path) -> list[dict[str, str]]:
	findings: list[dict[str, str]] = []
	seen_rel: set[str] = set()
	scan_roots: list[Path] = list(discover_npm_projects(root))
	build_result = root / "BuildResult"
	if build_result.is_dir():
		scan_roots.append(build_result)
	for sub in scan_roots:
		if not sub.is_dir():
			continue
		patterns = ("dist/**/*.js", "dist-build/**/*.js", "**/*.js") if sub.name == "BuildResult" or sub == build_result else ("dist/**/*.js", "dist-build/**/*.js")
		for pattern in patterns:
			for fp in sub.glob(pattern):
				if not fp.is_file():
					continue
				try:
					rel = str(fp.relative_to(root))
				except ValueError:
					rel = str(fp)
				try:
					size = fp.stat().st_size
				except OSError:
					continue
				if size > MAX_BYTES:
					key = f"{rel}|SKIP_LARGE|{size}"
					if key in seen_rel:
						continue
					seen_rel.add(key)
					findings.append(
						{
							"file": rel,
							"pattern": "SKIP_LARGE",
							"hits": f"{size} bytes",
						},
					)
					continue
				try:
					data = fp.read_bytes()
				except OSError:
					continue
				if b"\x00" in data[:4096]:
					continue
				for label, regex in LEAK_PATTERNS:
					m = regex.search(data)
					if m:
						snippet = m.group(0)[:160].decode("utf-8", errors="replace")
						row = {
							"file": rel,
							"pattern": label,
							"hits": html_module.escape(snippet),
						}
						dedupe_key = f"{rel}|{label}|{row['hits']}"
						if dedupe_key in seen_rel:
							break
						seen_rel.add(dedupe_key)
						findings.append(row)
						break
	return findings


def build_html(title: str, when: str, sections: list[tuple[str, str]]) -> str:
	style = """
body { font-family: system-ui, sans-serif; margin: 2rem; color: #111; background: #fafafa; }
h1 { font-size: 1.35rem; }
h2 { margin-top: 2rem; font-size: 1.05rem; border-bottom: 1px solid #ccc; padding-bottom: .25rem; }
table { border-collapse: collapse; width: 100%; background: #fff; }
th, td { border: 1px solid #ddd; padding: .4rem .5rem; text-align: left; font-size: .85rem; vertical-align: top; }
th { background: #f0f4f8; }
tr:nth-child(even) td { background: #fafafa; }
pre { white-space: pre-wrap; word-break: break-word; font-size: .75rem; background: #fff; padding: .75rem; border: 1px solid #ddd; }
"""
	parts = [
		'<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/>',
		f"<title>{html_module.escape(title)}</title><style>{style}</style></head><body>",
		f"<h1>{html_module.escape(title)}</h1>",
		f"<p>Generated {html_module.escape(when)}</p>",
	]
	for h, body in sections:
		parts.append(f"<h2>{html_module.escape(h)}</h2>{body}")
	parts.append("</body></html>")
	return "".join(parts)


def vuln_table(rows: list[dict[str, Any]]) -> str:
	if not rows:
		return "<p>No vulnerabilities in parsed npm audit output.</p>"
	buf = [
		"<table><thead><tr><th>Severity</th><th>Package</th><th>Title</th><th>URL / fix</th><th>Project</th>"
		"</tr></thead><tbody>",
	]
	for r in rows:
		buf.append(
			"<tr>"
			f"<td>{html_module.escape(str(r.get('severity')))}</td>"
			f"<td><code>{html_module.escape(str(r.get('package')))}</code></td>"
			f"<td>{html_module.escape(str(r.get('title')))}</td>"
			f"<td>{html_module.escape(str(r.get('detail')))} {html_module.escape(str(r.get('fixAvailable')))}</td>"
			f"<td><code>{html_module.escape(str(r.get('project', '')))}</code></td>"
			"</tr>",
		)
	buf.append("</tbody></table>")
	return "".join(buf)


def leak_table(rows: list[dict[str, str]]) -> str:
	if not rows:
		return "<p>No heuristic leak pattern matches under app bundle outputs.</p>"
	buf = ["<table><thead><tr><th>File</th><th>Pattern</th><th>Sample</th></tr></thead><tbody>"]
	for r in rows:
		buf.append(
			f"<tr><td><code>{html_module.escape(r['file'])}</code></td>"
			f"<td>{html_module.escape(r['pattern'])}</td>"
			f"<td><code>{r['hits']}</code></td></tr>",
		)
	buf.append("</tbody></table>")
	return "".join(buf)


def main() -> int:
	npm_exe = os.environ.get("NPM_EXE", shutil.which("npm") or "npm")
	now_dt = dt.datetime.now(dt.UTC)
	now_iso = now_dt.replace(microsecond=0).isoformat().replace("+00:00", "Z")
	stamp = now_dt.strftime("%Y%m%d-%H%M%S")

	REPORTS_DIR.mkdir(parents=True, exist_ok=True)
	html_path = REPORTS_DIR / f"security-report-{stamp}.html"
	pdf_path = REPORTS_DIR / f"security-report-{stamp}.pdf"

	projects = discover_npm_projects(REPO_ROOT)
	all_rows: list[dict[str, Any]] = []
	notes: list[str] = []

	for proj in projects:
		try:
			rel = str(proj.relative_to(REPO_ROOT))
		except ValueError:
			rel = str(proj)
		data, err = run_npm_audit(proj, npm_exe)
		if data is None:
			notes.append(f"<p><strong>{html_module.escape(rel)}</strong><pre>{html_module.escape(err)}</pre></p>")
			continue
		rows = parse_audit_vulnerabilities(data)
		meta = data.get("metadata")
		if isinstance(meta, dict) and "vulnerabilities" in meta:
			notes.append(
				"<p><strong>"
				+ html_module.escape(rel)
				+ "</strong> npm metadata:<pre>"
				+ html_module.escape(json.dumps(meta.get("vulnerabilities"), indent=2))
				+ "</pre></p>",
			)
		for r in rows:
			all_rows.append({**r, "project": rel})

	scan = scan_shipped_bundles(REPO_ROOT)

	disclaimer = (
		"<p>This report is <strong>not</strong> a full penetration test. It runs <code>npm audit --omit=dev</code> "
		"and heuristic scans on built JS for <code>ksys-*</code> app packages and <code>BuildResult</code> bundles only. "
		"Validate findings manually.</p>"
	)

	audit_block = disclaimer + "".join(notes)
	audit_block += f"<h3>Combined ({len(all_rows)} rows)</h3><pre>{html_module.escape(json.dumps(audit_summary_counts(all_rows), indent=2))}</pre>"
	audit_block += vuln_table(all_rows)

	doc = build_html(
		"Studio PP security audit report",
		now_iso,
		[
			("Dependency audit", audit_block),
			("Shipped JS heuristic scan", leak_table(scan)),
		],
	)

	html_path.write_text(doc, encoding="utf-8")

	pdf_ok, pdf_how = write_pdf(html_path, pdf_path)

	print(f"HTML: {html_path}")
	print(f"PDF:  {pdf_path} ({'OK: ' + pdf_how if pdf_ok else 'FAILED: ' + pdf_how})")
	print(json.dumps({"html": str(html_path), "pdf": str(pdf_path), "pdf_ok": pdf_ok}, indent=2))

	return 0


if __name__ == "__main__":
	sys.exit(main())

