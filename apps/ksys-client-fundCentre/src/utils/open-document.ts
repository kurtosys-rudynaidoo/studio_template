/**
 * Open or save a resolved document URL.
 * `blob:` URLs (from authenticated binary fetch) use `<a download>` so the file actually saves;
 * raw API paths often return 200 in a new tab without `x-ksys-token` and show nothing useful.
 */
function safeFilename(name: string | undefined, fallback: string): string {
	const n = (name || '').trim();
	if (!n) return fallback;
	return n.replace(/[/\\?%*:|"<>]/g, '_');
}

export function openDocumentInBrowser(url: string, filename?: string): void {
	if (!url?.trim()) return;

	if (url.startsWith('blob:')) {
		const a = document.createElement('a');
		a.href = url;
		a.download = safeFilename(filename, 'document.pdf');
		a.rel = 'noopener';
		document.body.appendChild(a);
		a.click();
		a.remove();
		return;
	}

	window.open(url, '_blank', 'noopener,noreferrer');
}
