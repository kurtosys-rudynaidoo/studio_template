import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { jsxDEV } from 'react/jsx-dev-runtime';

import { installSharedReact } from '@/services/shared-react.service';

import './shared-runtime';
import './styles/shared.entry.css';
import App from './components/App/App.tsx';

installSharedReact({ React, ReactDOM, ReactDOMClient, jsx, jsxs, jsxDEV, Fragment });

const CONTAINER_IDS = [
	import.meta.env.VITE_CONTAINER_ID,
	'appManager',
	'root',
].filter(Boolean);

function findContainer(): HTMLElement | null {
	for (const id of CONTAINER_IDS) {
		const el = document.getElementById(id);
		if (el) return el;
	}
	return null;
}

const container = findContainer();

if (container) {
	ReactDOMClient.createRoot(container).render(
		<React.StrictMode>
			<App mountId={container.id} />
		</React.StrictMode>,
	);
} else {
	console.error(
		`[AppManager] No mount container found. Tried: ${CONTAINER_IDS.join(', ')}`,
	);
}
