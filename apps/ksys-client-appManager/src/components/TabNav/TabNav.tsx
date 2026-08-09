import { useCallback } from 'react';

import { cn } from '@/utils/cn-utils';

import type { Section } from '@/types/app-manager.types';

interface TabNavProps {
	sections: Section[];
	activeId: string;
}

const SCROLL_OFFSET = 120;

function TabNav({ sections, activeId }: TabNavProps) {
	const handleTabClick = useCallback((sectionId: string) => {
		const el = document.getElementById(`section-${sectionId}`);
		if (!el) return;

		const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
		window.scrollTo({ top, behavior: 'smooth' });
	}, []);

	return (
		<nav
			data-am="tab-nav"
			className="sticky top-0 z-50 w-full border-b border-[#e0e0e0] bg-[#f5f5f5]"
			role="tablist"
		>
			<div
				data-am="tab-nav-scroll"
				className="flex w-full max-w-none overflow-x-auto"
				style={{ WebkitOverflowScrolling: 'touch' }}
			>
				{sections.map((section) => (
					<button
						key={section.id}
						role="tab"
						aria-selected={activeId === section.id}
						className={cn(
							'shrink-0 whitespace-nowrap px-4 py-3 text-sm font-medium tracking-wide transition-colors sm:px-5',
							'hover:text-[#0072BC] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0072BC]',
							activeId === section.id
								? 'border-b-2 border-[#0072BC] text-[#0072BC]'
								: 'text-[#666]',
						)}
						onClick={() => handleTabClick(section.id)}>
						{section.label}
					</button>
				))}
			</div>
		</nav>
	);
}

export default TabNav;
