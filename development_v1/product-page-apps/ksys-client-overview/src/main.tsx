import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';

import App from './components/App/App.tsx';
import './index.css';
import {
	DEFAULT_CONTAINER_IDS,
	getClientCodeFromQueryOrData,
	getCulture,
	getProductType,
} from './utils/resolve-mount-inputs';

const CONTAINER_IDS = DEFAULT_CONTAINER_IDS;
const WRAPPER_CLASS = '__studio-widget-root';

let reactRoot: Root | null = null;
let observer: MutationObserver | null = null;

function findContainer(): HTMLElement | null {
	for (const id of CONTAINER_IDS) {
		const el = document.getElementById(id);
		if (el) return el;
	}
	return null;
}

function mount() {
	const container = findContainer();
	if (!container) {
		console.error(
			`[StudioWidget] Mount container not found. Tried: ${CONTAINER_IDS.join(', ')}`,
		);
		return;
	}

	if (observer) {
		observer.disconnect();
		observer = null;
	}

	if (reactRoot) {
		reactRoot.unmount();
		reactRoot = null;
	}

	container.innerHTML = '';

	const wrapper = document.createElement('div');
	wrapper.className = WRAPPER_CLASS;
	container.appendChild(wrapper);

	const clientCode = getClientCodeFromQueryOrData(CONTAINER_IDS) || null;
	const culture = getCulture(CONTAINER_IDS);
	const productType = getProductType(CONTAINER_IDS);

	reactRoot = createRoot(wrapper);
	reactRoot.render(
		<StrictMode>
			<App
				clientCode={clientCode}
				culture={culture}
				productType={productType}
			/>
		</StrictMode>,
	);

	// DXM / Elementor sometimes injects siblings into the mount node; keep our root.
	observer = new MutationObserver(() => {
		for (let i = container.childNodes.length - 1; i >= 0; i--) {
			const child = container.childNodes[i];
			if (child instanceof HTMLElement && child.classList.contains(WRAPPER_CLASS)) {
				continue;
			}
			container.removeChild(child);
		}
	});
	observer.observe(container, { childList: true });
}

function scheduledMount() {
	// Small delay so DXM/App Manager can finish writing data-input-* attributes.
	setTimeout(mount, 0);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', scheduledMount);
} else {
	scheduledMount();
}
