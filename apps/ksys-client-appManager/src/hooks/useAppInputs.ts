import { useRef } from 'react';

import type { AppInputs, ProductType } from '@/types/app-manager.types';

const APP_MANAGER_SELECTOR = '[data-ksys-app-template-id="ksys-app-manager"]';

const VALID_PRODUCT_TYPES: ProductType[] = [
	'mutualFunds',
	'institutionalStrategies',
	'longShortInstitutionalStrategies',
	'longShortMutualFunds',
];

function getUrlParam(name: string): string | null {
	const params = new URLSearchParams(window.location.search);
	return params.get(name);
}

/**
 * Resolves a data attribute from the DXM page using the same lookup order
 * the child apps use:
 *   1. The mount container element (e.g. `#appManager`)
 *   2. A pre-existing `[data-ksys-app-template-id="ksys-app-manager"]` element
 *   3. Any element on the page carrying the attribute
 */
function getDomAttribute(attr: string, mountId?: string): string | null {
	if (mountId) {
		const mount = document.getElementById(mountId);
		if (mount?.hasAttribute(attr)) {
			return mount.getAttribute(attr);
		}
	}

	const appManager = document.querySelector<HTMLElement>(APP_MANAGER_SELECTOR);
	if (appManager?.hasAttribute(attr)) {
		return appManager.getAttribute(attr);
	}

	const anyEl = document.querySelector<HTMLElement>(`[${attr}]`);
	if (anyEl) {
		return anyEl.getAttribute(attr);
	}

	return null;
}

function resolveInput(attrName: string, urlParam: string, mountId?: string): string | null {
	return getDomAttribute(attrName, mountId) ?? getUrlParam(urlParam);
}

/** Query string wins so a host dev shell can override DXM / index.html defaults. */
function resolveClientCode(mountId?: string): string {
	const fromQuery =
		getUrlParam('kurtosys_id') || getUrlParam('clientCode') || getUrlParam('client_code') || '';
	if (fromQuery) return fromQuery;

	return getDomAttribute('data-input-client-code', mountId) ?? '';
}

function resolveProductType(mountId?: string): ProductType | undefined {
	const raw =
		resolveInput('data-input-product-type', 'productType', mountId) ??
		resolveInput('data-input-product-type', 'product-type', mountId);

	if (raw && VALID_PRODUCT_TYPES.includes(raw as ProductType)) {
		return raw as ProductType;
	}
	return undefined;
}

/**
 * Resolves shared inputs from the DXM host page.
 *
 * **clientCode:** URL `kurtosys_id` / `clientCode` / `client_code` first (dev shell override), then
 * `data-input-client-code` on mount → app-manager template → any element.
 *
 * **culture / productType / fundList:** `data-input-*` (same DOM order as above), then matching URL param, then defaults (`culture` → `en-US`).
 *
 * Resolved once on mount; values remain stable for the app lifetime.
 */
export function useAppInputs(mountId?: string): AppInputs {
	const inputsRef = useRef<AppInputs | null>(null);

	if (!inputsRef.current) {
		inputsRef.current = {
			clientCode: resolveClientCode(mountId),
			culture: resolveInput('data-input-culture', 'culture', mountId) ?? 'en-US',
			productType: resolveProductType(mountId),
			fundList: resolveInput('data-input-fundlist', 'fundList', mountId) ?? undefined,
		};
	}

	return inputsRef.current;
}
