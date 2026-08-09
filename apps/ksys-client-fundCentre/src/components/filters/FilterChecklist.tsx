/**
 * FilterChecklist Component
 * Checklist filter type
 */

import { useCallback } from 'react';

import type { FilterConfig } from '@/types/fund-center.types';
import type { FilterState } from '@/types/filter.types';

export interface FilterChecklistProps {
	filter: FilterConfig;
	state: FilterState;
	onChange: (property: string, values: string[]) => void;
}

function FilterChecklist({ filter, state, onChange }: FilterChecklistProps) {
	const handleToggle = useCallback(
		(value: string) => {
			const currentValues = state.values || [];
			const newValues = currentValues.includes(value)
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];

			onChange(filter.property, newValues);
		},
		[filter.property, state.values, onChange],
	);

	if (state.loading) {
		return <div className="text-sm text-muted-foreground">Loading options...</div>;
	}

	// Handle both string[] and Array<{label, value}> formats
	const options = state.options || filter.options || [];
	const normalizedOptions = options.map((opt) => {
		if (typeof opt === 'string') {
			return { label: opt, value: opt };
		}
		return opt;
	});

	return (
		<div className="space-y-2">
			<label className="text-sm font-medium">{filter.label}</label>
			<div className="space-y-1">
				{normalizedOptions.map((option) => (
					<label key={option.value} className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							checked={state.values?.includes(option.value) || false}
							onChange={() => handleToggle(option.value)}
							className="rounded border-gray-300"
						/>
						<span className="text-sm">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	);
}

export default FilterChecklist;

