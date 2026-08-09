/**
 * Automated accessibility checks (axe-core via jest-axe).
 * Color contrast is disabled in jsdom — validate contrast in browser DevTools or a dedicated audit.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import ModuleTabs, { FUND_CENTER_MODULE_PANEL_ID } from '@/components/FundCenter/ModuleTabs';
import FundTypeTabs, { FUND_CENTER_FUND_TYPE_PANEL_ID } from '@/components/FundCenter/FundTypeTabs';
import DocumentCell from '@/components/fund/DocumentCell';

const axeLight = (container: Element) =>
	axe(container, {
		rules: {
			'color-contrast': { enabled: false },
		},
	});

describe('accessibility (axe)', () => {
	it('ModuleTabs with associated tabpanel has no serious violations', async () => {
		const { container } = render(
			<div>
				<ModuleTabs
					modules={[
						{ id: 'overview', label: 'Overview' },
						{ id: 'materials', label: 'Materials' },
					]}
					activeModule="overview"
					onModuleChange={() => {}}
				/>
				<div id={FUND_CENTER_MODULE_PANEL_ID} role="tabpanel" aria-labelledby="module-tab-overview">
					<p>Panel content</p>
				</div>
			</div>,
		);
		expect(await axeLight(container)).toHaveNoViolations();
	});

	it('FundTypeTabs with associated tabpanel has no serious violations', async () => {
		const { container } = render(
			<div>
				<FundTypeTabs
					fundTypes={[
						{ id: 'separate-account', label: 'Institutional' },
						{ id: 'mutual-fund', label: 'Mutual Funds' },
					]}
					activeFundType="separate-account"
					onFundTypeChange={() => {}}
				/>
				<div id={FUND_CENTER_FUND_TYPE_PANEL_ID} role="tabpanel" aria-labelledby="fund-type-tab-separate-account">
					<p>Funds</p>
				</div>
			</div>,
		);
		expect(await axeLight(container)).toHaveNoViolations();
	});

	it('FundTypeTabs with Subadvised landing link has no serious violations', async () => {
		const { container } = render(
			<div>
				<FundTypeTabs
					fundTypes={[
						{ id: 'separate-account', label: 'Institutional' },
						{ id: 'mutual-fund', label: 'Mutual Funds' },
					]}
					activeFundType="separate-account"
					onFundTypeChange={() => {}}
					subadvisedLink={{ href: 'https://example.com/subadvised', label: 'Subadvised' }}
				/>
				<div id={FUND_CENTER_FUND_TYPE_PANEL_ID} role="tabpanel" aria-labelledby="fund-type-tab-separate-account">
					<p>Funds</p>
				</div>
			</div>,
		);
		expect(await axeLight(container)).toHaveNoViolations();
	});

	it('FundTypeTabs: ArrowRight moves focus only; Enter activates focused tab', async () => {
		const onFundTypeChange = vi.fn();
		render(
			<div>
				<FundTypeTabs
					fundTypes={[
						{ id: 'separate-account', label: 'Institutional' },
						{ id: 'mutual-fund', label: 'Mutual Funds' },
					]}
					activeFundType="separate-account"
					onFundTypeChange={onFundTypeChange}
				/>
				<div id={FUND_CENTER_FUND_TYPE_PANEL_ID} role="tabpanel" aria-labelledby="fund-type-tab-separate-account">
					<p>Funds</p>
				</div>
			</div>,
		);
		const institutional = screen.getByRole('tab', { name: 'Institutional' });
		const mutualFund = screen.getByRole('tab', { name: 'Mutual Funds' });
		institutional.focus();
		fireEvent.keyDown(institutional, { key: 'ArrowRight' });
		expect(onFundTypeChange).not.toHaveBeenCalled();
		await waitFor(() => expect(mutualFund).toHaveFocus());
		fireEvent.keyDown(mutualFund, { key: 'Enter' });
		expect(onFundTypeChange).toHaveBeenCalledWith('mutual-fund');
	});

	it('ModuleTabs: ArrowRight moves focus only; Space activates focused tab', async () => {
		const onModuleChange = vi.fn();
		render(
			<div>
				<ModuleTabs
					modules={[
						{ id: 'overview', label: 'Overview' },
						{ id: 'materials', label: 'Materials' },
					]}
					activeModule="overview"
					onModuleChange={onModuleChange}
				/>
				<div id={FUND_CENTER_MODULE_PANEL_ID} role="tabpanel" aria-labelledby="module-tab-overview">
					<p>Panel content</p>
				</div>
			</div>,
		);
		const overview = screen.getByRole('tab', { name: 'Overview' });
		const materials = screen.getByRole('tab', { name: 'Materials' });
		overview.focus();
		fireEvent.keyDown(overview, { key: 'ArrowRight' });
		expect(onModuleChange).not.toHaveBeenCalled();
		await waitFor(() => expect(materials).toHaveFocus());
		fireEvent.keyDown(materials, { key: ' ' });
		expect(onModuleChange).toHaveBeenCalledWith('materials');
	});

	it('DocumentCell with one document has no serious violations', async () => {
		const { container } = render(
			<DocumentCell
				documents={[{ id: '1', type: 'Factsheet', filename: 'f.pdf', url: 'https://example.com/f.pdf' }]}
			/>,
		);
		expect(await axeLight(container)).toHaveNoViolations();
	});

	it('DocumentCell empty state exposes an accessible name', async () => {
		const { getByLabelText } = render(<DocumentCell documents={[]} />);
		expect(getByLabelText('No document available')).toBeInTheDocument();
	});
});
