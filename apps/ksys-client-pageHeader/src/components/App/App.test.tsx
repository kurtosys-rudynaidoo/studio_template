import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
	it('renders the starter widget with resolved inputs', () => {
		render(
			<App
				clientCode="DEMO123"
				culture="en-US"
				productType="mutualFunds"
			/>,
		);

		expect(screen.getByRole('heading', { name: 'Page Header' })).toBeInTheDocument();
		expect(screen.getByText('DEMO123')).toBeInTheDocument();
		expect(screen.getByText('en-US')).toBeInTheDocument();
		expect(screen.getByText('mutualFunds')).toBeInTheDocument();
	});
});
