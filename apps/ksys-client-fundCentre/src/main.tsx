import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './elementor-embed-overrides.css';
import App from './components/App/App.tsx';

/**
 * Mount order:
 * 1. `#root` — Vite local preview
 * 2. `#fundCentre` / `#fundCenter` — Studio / CMS mount (IIFE)
 * 3. `#your-app-container` (+ optional shadow `#root`) — legacy FC embed loader
 */
function getMountElement(): HTMLElement | null {
	const light = document.getElementById('root');
	if (light) return light;

	const studioMount =
		document.getElementById('fundCentre') || document.getElementById('fundCenter');
	if (studioMount) return studioMount;

	const embedHost = document.getElementById('your-app-container');
	const sr = embedHost?.shadowRoot;
	if (sr) {
		return (
			sr.querySelector<HTMLElement>('#root') ??
			sr.querySelector<HTMLElement>('#shadow-root')
		);
	}
	if (embedHost) return embedHost;

	return null;
}

const mountEl = getMountElement();
if (!mountEl) {
	throw new Error(
		'Fund Centre: mount node not found. Expected #root (dev), #fundCentre / #fundCenter, or #your-app-container.',
	);
}

createRoot(mountEl).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
