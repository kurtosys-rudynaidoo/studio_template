/**
 * FundDisclaimers Component
 * Displays fund disclaimers at the bottom of the expanded card
 * Filters by module/tab and deduplicates
 */

import { useMemo } from 'react';
import type { FundDisclaimer } from '@/types/fund.types';
import type { ModuleId } from '@/types/fund-center.types';
import { safeHtml } from '@/utils/safe-content';

export interface FundDisclaimersProps {
	disclaimers: FundDisclaimer[];
	moduleId?: ModuleId;
}

function FundDisclaimers({ disclaimers, moduleId }: FundDisclaimersProps) {
	// Filter and deduplicate disclaimers based on module
	const filteredDisclaimers = useMemo(() => {
		if (!disclaimers || disclaimers.length === 0) {
			return [];
		}

		// Map module IDs to relevant disclaimer types
		const moduleDisclaimerTypes: Record<ModuleId, string[]> = {
			overview: ['General', 'Performance', 'Fees Expenses Table'],
			performance: ['Performance', 'Monthly Performance', 'Quarterly Performance', 'Yearly Performance'],
			materials: ['Documents', 'Factsheet', 'Profile', 'Holdings', 'Commentary'],
			forms: ['Forms', 'Application'],
		};

		// Get relevant types for current module
		const relevantTypes = moduleId ? moduleDisclaimerTypes[moduleId] || [] : [];

		// Filter disclaimers by type if module is specified
		let filtered = disclaimers;
		if (moduleId && relevantTypes.length > 0) {
			filtered = disclaimers.filter((d) =>
				relevantTypes.some((type) => d.type.toLowerCase().includes(type.toLowerCase())),
			);
		}

		// Deduplicate by content (case-insensitive)
		const seen = new Set<string>();
		const unique: FundDisclaimer[] = [];

		filtered.forEach((disclaimer) => {
			const contentKey = disclaimer.content.toLowerCase().trim();
			if (!seen.has(contentKey)) {
				seen.add(contentKey);
				unique.push(disclaimer);
			}
		});

		return unique;
	}, [disclaimers, moduleId]);

	if (filteredDisclaimers.length === 0) {
		return null;
	}

	return (
		<ol
			className="mt-6 space-y-2"
			aria-label="Footnote disclaimers"
			style={{
				fontSize: '12px',
				fontFamily: 'var(--font-condensed)',
				fontWeight: 400,
			}}>
			{filteredDisclaimers.map((disclaimer, index) => (
				<li
					key={`${disclaimer.type}-${index}`}
					className="flex"
					style={{
						color: '#727272',
						fontFamily: 'var(--font-condensed)',
						fontSize: '11px',
					}}>
					<div dangerouslySetInnerHTML={{ __html: safeHtml(disclaimer.content) }} />
				</li>
			))}
		</ol>
	);
}

export default FundDisclaimers;

