/** Portal target inside the embed CSS scope. The id must match `${containerId}-portal`. */
export function portalRoot(containerId: string): HTMLElement {
	const id = `${containerId}-portal`;
	let el = document.getElementById(id);
	if (!el) {
		el = document.createElement('div');
		el.id = id;
		document.body.appendChild(el);
	}
	return el;
}
