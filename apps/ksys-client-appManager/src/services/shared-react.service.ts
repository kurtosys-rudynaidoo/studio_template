/**
 * Exposes React, ReactDOM, and JSX runtime on `window` so child apps can
 * externalise React instead of bundling their own copy.
 *
 * Child apps that opt in should configure their bundler to treat `react`,
 * `react-dom`, `react/jsx-runtime`, and `react/jsx-dev-runtime` as externals
 * mapped to these globals:
 *
 *   - `window.React`
 *   - `window.ReactDOM`           (includes client API: createRoot, etc.)
 *   - `window.__REACT_JSX_RUNTIME` (jsx, jsxs, jsxDEV, Fragment)
 */

interface SharedReactDeps {
	React: typeof import('react');
	ReactDOM: typeof import('react-dom');
	ReactDOMClient: typeof import('react-dom/client');
	jsx: unknown;
	jsxs: unknown;
	jsxDEV: unknown;
	Fragment: unknown;
}

declare global {
	interface Window {
		__REACT_JSX_RUNTIME?: { jsx: unknown; jsxs: unknown; jsxDEV: unknown; Fragment: unknown };
	}
}

let installed = false;

export function installSharedReact({
	React,
	ReactDOM,
	ReactDOMClient,
	jsx,
	jsxs,
	jsxDEV,
	Fragment,
}: SharedReactDeps): void {
	if (installed) return;
	installed = true;

	(window as unknown as Record<string, unknown>).React = React;
	(window as unknown as Record<string, unknown>).ReactDOM = { ...ReactDOM, ...ReactDOMClient };
	window.__REACT_JSX_RUNTIME = { jsx, jsxs, jsxDEV, Fragment };
}
