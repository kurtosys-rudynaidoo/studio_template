/** Canonical mount id plus optional DXM aliases (e.g. `widget-app`). */
export const DEFAULT_CONTAINER_IDS = [
	(import.meta.env.VITE_CONTAINER_ID as string | undefined) || 'overview',
	'overview',
].filter(Boolean);

/**
 * Resolves DXM inputs: mount container first, then App Manager template, then any element.
 */
export function getDataAttribute(
	attr: string,
	fallback: string = '',
	containerIds: string[] = DEFAULT_CONTAINER_IDS,
): string {
	const fullAttr = `data-input-${attr}`;

	for (const id of containerIds) {
		const container = document.getElementById(id);
		if (container?.hasAttribute(fullAttr)) {
			return container.getAttribute(fullAttr) ?? fallback;
		}
	}

	const appManager = document.querySelector('[data-ksys-app-template-id="ksys-app-manager"]');
	if (appManager?.hasAttribute(fullAttr)) {
		return appManager.getAttribute(fullAttr) ?? fallback;
	}

	const anyElement = document.querySelector(`[${fullAttr}]`);
	if (anyElement) {
		return anyElement.getAttribute(fullAttr) ?? fallback;
	}

	return fallback;
}

export function getClientCodeFromQueryOrData(containerIds?: string[]): string {
	const q = new URLSearchParams(window.location.search);
	const fromQuery = q.get('kurtosys_id') || q.get('clientCode') || q.get('client_code') || '';
	if (fromQuery) return fromQuery;
	return getDataAttribute('client-code', '', containerIds);
}

export function getCulture(containerIds?: string[]): string {
	return getDataAttribute('culture', 'en-US', containerIds);
}

export function getProductType(containerIds?: string[]): string {
	return getDataAttribute('product-type', '', containerIds);
}
