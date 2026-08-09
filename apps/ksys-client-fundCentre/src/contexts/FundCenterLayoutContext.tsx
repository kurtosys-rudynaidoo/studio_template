import {
	createContext,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

import { FUND_CENTER_COMPACT_LAYOUT_MAX_WIDTH } from '@/constants/fund-center-layout.constants';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface FundCenterLayoutContextValue {
	useCompactLayout: boolean;
	containerWidth: number | null;
}

const FundCenterLayoutContext = createContext<FundCenterLayoutContextValue | null>(null);

interface FundCenterLayoutProviderProps {
	/** Measured module panel element (Fund Center content area inside the embed). */
	containerElement: HTMLElement | null;
	children: ReactNode;
}

function FundCenterLayoutProvider({ containerElement, children }: FundCenterLayoutProviderProps) {
	const [containerWidth, setContainerWidth] = useState<number | null>(null);

	useLayoutEffect(() => {
		if (!containerElement) {
			setContainerWidth(null);
			return;
		}

		const updateWidth = () => {
			setContainerWidth(containerElement.getBoundingClientRect().width);
		};

		updateWidth();

		const observer = new ResizeObserver(() => {
			updateWidth();
		});
		observer.observe(containerElement);

		return () => {
			observer.disconnect();
		};
	}, [containerElement]);

	const useCompactLayout =
		containerWidth !== null && containerWidth < FUND_CENTER_COMPACT_LAYOUT_MAX_WIDTH;

	const value = useMemo(
		() => ({
			useCompactLayout,
			containerWidth,
		}),
		[useCompactLayout, containerWidth],
	);

	return <FundCenterLayoutContext.Provider value={value}>{children}</FundCenterLayoutContext.Provider>;
}

/**
 * True when the Fund Center content area is too narrow for multi-column tables.
 * Uses container ResizeObserver inside Fund Center; falls back to viewport ≤1100px elsewhere.
 */
function useFundCenterCompactLayout(): boolean {
	const context = useContext(FundCenterLayoutContext);
	const viewportCompact = useIsMobile(FUND_CENTER_COMPACT_LAYOUT_MAX_WIDTH);

	if (context) {
		if (context.containerWidth === null) {
			return viewportCompact;
		}
		return context.useCompactLayout;
	}

	return viewportCompact;
}

/** Measured Fund Center module panel width (null until first layout). */
function useFundCenterContainerWidth(): number | null {
	const context = useContext(FundCenterLayoutContext);
	return context?.containerWidth ?? null;
}

export { FundCenterLayoutProvider, useFundCenterCompactLayout, useFundCenterContainerWidth };
