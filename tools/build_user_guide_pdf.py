#!/usr/bin/env python3
"""Render USER_GUIDE.pdf from USER_GUIDE.html (xhtml2pdf then headless Chromium)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent


def main() -> int:
	html_path = REPO_ROOT / "USER_GUIDE.html"
	pdf_path = REPO_ROOT / "USER_GUIDE.pdf"
	if not html_path.is_file():
		print(f"Missing {html_path}", file=sys.stderr)
		return 1
	from pdf_from_html import write_pdf

	ok, how = write_pdf(html_path, pdf_path)
	print(f"PDF: {pdf_path} ({'OK: ' + how if ok else 'FAILED: ' + how})")
	print(json.dumps({"html": str(html_path), "pdf": str(pdf_path), "pdf_ok": ok}, indent=2))
	return 0 if ok else 1


if __name__ == "__main__":
	raise SystemExit(main())
