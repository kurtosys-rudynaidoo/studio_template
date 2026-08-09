import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
	it('does not render the Investments Center top banner', () => {
		render(<App />);
		expect(screen.queryByRole('banner')).not.toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: /investments center/i })).not.toBeInTheDocument();
	});
});
