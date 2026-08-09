import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import App from './App';

describe('App Component', () => {
	afterEach(() => {
		cleanup();
	});

	it('should render with app manager data attribute', () => {
		const { container } = render(<App />);

		const appManager = container.querySelector(
			'[data-ksys-app-template-id="ksys-app-manager"]',
		);
		expect(appManager).toBeInTheDocument();
	});

	it('should set default culture data attribute', () => {
		const { container } = render(<App />);

		const appManager = container.querySelector(
			'[data-ksys-app-template-id="ksys-app-manager"]',
		);
		expect(appManager).toHaveAttribute('data-input-culture', 'en-US');
	});

	it('should set default product type data attribute', () => {
		const { container } = render(<App />);

		const appManager = container.querySelector(
			'[data-ksys-app-template-id="ksys-app-manager"]',
		);
		expect(appManager).toHaveAttribute(
			'data-input-product-type',
			'institutionalStrategies',
		);
	});

	it('should render app manager root element', () => {
		const { container } = render(<App />);

		const root = container.querySelector('[data-ksys-app-template-id]');
		expect(root).toBeInTheDocument();
	});
});
