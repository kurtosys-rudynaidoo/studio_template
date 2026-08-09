/**
 * FundGroupHeader Component
 * Header for grouped funds (e.g., by geographical focus)
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface FundGroupHeaderProps {
	label: string;
	groupId: string;
	isExpanded?: boolean;
	onToggle?: (groupId: string) => void;
}

function FundGroupHeader({ label, groupId, isExpanded = true, onToggle }: FundGroupHeaderProps) {
	const [expanded, setExpanded] = useState(isExpanded);

	const handleToggle = () => {
		const newExpanded = !expanded;
		setExpanded(newExpanded);
		if (onToggle) {
			onToggle(groupId);
		}
	};

	const headerId = `fundHeader-${groupId.replace(/\s+/g, '-').toLowerCase()}`;

	return (
		<div
			id={headerId}
			role="region"
			aria-label={label}
			className="sticky top-0 z-10 flex items-center gap-2 px-5 py-3.5 text-white"
			style={{
				backgroundColor: 'var(--tab-active-bg)',
				fontFamily: 'var(--font-sans)',
				fontWeight: 500,
				fontSize: '16px',
				lineHeight: '18px',
			}}>
			<Button
				variant="ghost"
				size="icon"
				onClick={handleToggle}
				aria-label={`${expanded ? 'Collapse' : 'Expand'} group toggle for ${label}`}
				aria-expanded={expanded}
				className="h-5 w-5 text-white hover:bg-white/20">
				{expanded ? '−' : '+'}
			</Button>
			<h2
				className="m-0"
				style={{
					fontFamily: 'var(--font-sans)',
					fontWeight: 500,
					fontSize: '16px',
					lineHeight: '18px',
				}}>
				{label}
			</h2>
		</div>
	);
}

export default FundGroupHeader;

