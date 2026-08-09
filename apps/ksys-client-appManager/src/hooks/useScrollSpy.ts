import { useState, useEffect, useRef } from 'react';

const SCROLL_OFFSET = 140;

export function useScrollSpy(sectionIds: string[]): string {
	const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
	const rafRef = useRef<number>(0);

	useEffect(() => {
		if (sectionIds.length === 0) return;

		const handleScroll = () => {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() => {
				let current = sectionIds[0];

				for (let i = sectionIds.length - 1; i >= 0; i--) {
					const el = document.getElementById(`section-${sectionIds[i]}`);
					if (el) {
						const rect = el.getBoundingClientRect();
						if (rect.top <= SCROLL_OFFSET) {
							current = sectionIds[i];
							break;
						}
					}
				}

				setActiveId(current);
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(rafRef.current);
		};
	}, [sectionIds]);

	return activeId;
}
