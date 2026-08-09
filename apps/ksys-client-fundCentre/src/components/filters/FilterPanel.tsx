/**
 * FilterPanel Component
 * Main filter container - horizontal layout matching Figma design
 */

import type { FiltersState } from '@/types/filter.types';
import FilterDropdown from './FilterDropdown';

export interface FilterPanelProps {
	filterState: FiltersState;
	filterOptions: Record<string, Array<{ label: string; value: string }>>;
	onFilterChange: (property: string, values: string[]) => void;
	tooltips?: Record<string, string | null>;
}

function FilterPanel({ filterState, filterOptions, onFilterChange, tooltips = {} }: FilterPanelProps) {
	// Define filter properties and their labels
	const filterConfig = [
		{ property: 'investment_style', label: 'Investment Style' },
		{ property: 'geographical_focus', label: 'Geographical Focus' },
		{ property: 'market_cap_focus', label: 'Market Capitalization Focus' },
	];

	return (
		<div
			className="flex"
			style={{
				fontFamily: 'var(--font-condensed)',
			}}>
			{filterConfig.map((config) => {
				const state = filterState.filters[config.property] || {
					property: config.property,
					values: [],
				};

				// Use options from filterOptions prop, or fallback to state.options
				const options = filterOptions[config.property] || state.options || [];
				const tooltip = tooltips[config.property] || tooltips[config.label] || null;

				console.log(`FilterPanel: ${config.property}`, {
					filterOptions: filterOptions[config.property],
					stateOptions: state.options,
					finalOptions: options,
				});

				return (
					<FilterDropdown
						key={config.property}
						property={config.property}
						label={config.label}
						state={{ ...state, options }}
						options={options}
						onChange={onFilterChange}
						tooltip={tooltip}
					/>
				);
			})}
		</div>
	);
}

export default FilterPanel;

