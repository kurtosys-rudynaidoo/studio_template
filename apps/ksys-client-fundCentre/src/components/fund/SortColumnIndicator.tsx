/**
 * Visible sort affordance for table headers (paired with aria-sort on <th>).
 */

export interface SortColumnIndicatorProps {
	/** This column is the active sort key */
	active: boolean;
	/** Current direction when active; null shows both chevrons (unsorted) */
	direction: 'asc' | 'desc' | null;
}

export function SortColumnIndicator({ active, direction }: SortColumnIndicatorProps) {
	const boxClass = [
		'inline-flex shrink-0 items-center justify-center self-center rounded-sm bg-transparent',
		'min-w-8 px-0.5 py-1 transition-[color,opacity,background-color]',
		active
			? 'text-[var(--primary)] opacity-100'
			: 'text-gray-500 opacity-75 hover:opacity-100 hover:bg-black/[0.04] hover:text-gray-700',
	].join(' ');

	return (
		<span className={boxClass} aria-hidden>
			<svg
				className="block"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				{active && direction === 'asc' ? (
					<path d="M8 2L10 6H6L8 2Z" fill="currentColor" />
				) : active && direction === 'desc' ? (
					<path d="M8 14L6 10H10L8 14Z" fill="currentColor" />
				) : (
					<>
						<path d="M8 2L10 6H6L8 2Z" fill="currentColor" />
						<path d="M8 14L6 10H10L8 14Z" fill="currentColor" />
					</>
				)}
			</svg>
		</span>
	);
}
