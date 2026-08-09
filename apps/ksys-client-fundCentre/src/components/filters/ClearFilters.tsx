/**
 * ClearFilters Component
 * Clear all filters button
 */

import { Button } from '@/components/ui/button';

export interface ClearFiltersProps {
	onClear: () => void;
	hasActiveFilters: boolean;
}

function ClearFilters({ onClear, hasActiveFilters }: ClearFiltersProps) {
	if (!hasActiveFilters) {
		return null;
	}

	return (
		<Button variant="outline" size="sm" onClick={onClear}>
			Clear All Filters
		</Button>
	);
}

export default ClearFilters;

