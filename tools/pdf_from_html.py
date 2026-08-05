"""Shared HTML→PDF helpers (xhtml2pdf then headless Chromium). Used by security_audit_report and build_user_guide_pdf."""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path


def chromium_executable_candidates() -> list[str]:
	"""PATH first, then typical Windows and macOS install locations."""
	seen: set[str] = set()
	out: list[str] = []
	for name in ("msedge", "chrome", "google-chrome", "chromium"):
		p = shutil.which(name)
		if p and p not in seen:
			seen.add(p)
			out.append(p)
	if sys.platform == "win32":
		for base in (
			os.environ.get("PROGRAMFILES", r"C:\Program Files"),
			os.environ.get("PROGRAMFILES(X86)", r"C:\Program Files (x86)"),
		):
			for sub in (
				r"Microsoft\Edge\Application\msedge.exe",
				r"Google\Chrome\Application\chrome.exe",
			):
				ep = Path(base) / sub
				if ep.is_file():
					s = str(ep)
					if s not in seen:
						seen.add(s)
						out.append(s)
	elif sys.platform == "darwin":
		for ep in (
			Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
			Path("/Applications/Chromium.app/Contents/MacOS/Chromium"),
			Path("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
		):
			if ep.is_file():
				s = str(ep)
				if s not in seen:
					seen.add(s)
					out.append(s)
	return out


def write_pdf(html_path: Path, pdf_path: Path) -> tuple[bool, str]:
	pass_err = ""
	try:
		from xhtml2pdf import pisa  # type: ignore[import-untyped]

		with html_path.open("rb") as src, pdf_path.open("wb") as dst:
			status = pisa.CreatePDF(src, dest=dst)
		if not getattr(status, "err", False) and pdf_path.is_file() and pdf_path.stat().st_size > 0:
			return True, "xhtml2pdf"
	except Exception as e:
		pass_err = f"xhtml2pdf: {e}"

	if pdf_path.exists():
		try:
			pdf_path.unlink()
		except OSError:
			pass

	uri = html_path.resolve().as_uri()
	for browser in chromium_executable_candidates():
		try:
			subprocess.run(
				[browser, "--headless=new", f"--print-to-pdf={pdf_path}", uri],
				capture_output=True,
				timeout=120,
				check=True,
			)
			if pdf_path.is_file() and pdf_path.stat().st_size > 0:
				return True, Path(browser).name
		except Exception as ex:
			pass_err = f"{browser}: {ex}"
	return False, pass_err or "no PDF backend"
