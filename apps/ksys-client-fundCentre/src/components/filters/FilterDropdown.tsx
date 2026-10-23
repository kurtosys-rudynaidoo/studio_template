/**
 * FilterDropdown Component
 * Dropdown filter with search and checkboxes matching Figma design
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { FilterState } from '@/types/filter.types';
import { safeHtml } from '@/utils/safe-content';

export interface FilterDropdownProps {
	property: string;
	label: string;
	state: FilterState;
	options: Array<{ label: string; value: string }>;
	onChange: (property: string, values: string[]) => void;
	tooltip?: string | null;
}

	function FilterDropdown({ property, label, state, options, onChange, tooltip }: FilterDropdownProps) {
		const [showTooltip, setShowTooltip] = useState(false);
		const tooltipRef = useRef<HTMLDivElement>(null);
		const [isOpen, setIsOpen] = useState(false);
		const [searchText, setSearchText] = useState('');
		const dropdownRef = useRef<HTMLDivElement>(null);

		// Log options for debugging
		useEffect(() => {
			console.log(`FilterDropdown ${property} (${label}):`, {
				optionsCount: options?.length || 0,
				options,
				stateValues: state.values,
				stateOptions: state.options,
			});
		}, [property, label, options, state]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleToggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const handleCheckboxChange = useCallback(
		(value: string, checked: boolean) => {
			const currentValues = state.values || [];
			const newValues = checked
				? [...currentValues, value]
				: currentValues.filter((v) => v !== value);

			onChange(property, newValues);
		},
		[property, state.values, onChange],
	);

	// Filter options based on search text
	const filteredOptions = useMemo(() => {
		if (!options || options.length === 0) {
			console.log(`FilterDropdown ${property}: No options available`, { options, state });
			return [];
		}
		return options.filter((option) =>
			option.label.toLowerCase().includes(searchText.toLowerCase()) ||
			option.value.toLowerCase().includes(searchText.toLowerCase())
		);
	}, [options, searchText, property, state]);

	// Get display text for button
	const displayText = useMemo(() => {
		if (state.values && state.values.length > 0) {
			if (state.values.length === 1) {
				const selectedOption = options.find((opt) => opt.value === state.values[0]);
				return selectedOption?.label || 'Select filters';
			}
			return `${state.values.length} selected`;
		}
		return 'Select filters';
	}, [state.values, options]);

	// Info icon SVG (13px x 13px) - blue circle with white "i"
	const InfoIcon = () => (
		<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="6.5" cy="6.5" r="6.5" fill="#003a54" />
			<text x="6.5" y="9.5" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">i</text>
		</svg>
	);

	return (
		<div ref={dropdownRef} className="relative" style={{ margin: '0 10px 0 0' }}>
			{/* Label with tooltip icon */}
			<div className="flex items-center gap-[10px] mb-[2px]">
				<label
					htmlFor={property}
					className="block"
					style={{
						color: '#fff',
						fontFamily: 'var(--font-condensed)',
						fontWeight: 400,
						fontSize: '14px',
						lineHeight: '16px',
					}}>
					{label}
				</label>
				{tooltip && (
					<div className="relative" ref={tooltipRef}>
						<button
							type="button"
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => {
								// Delay hiding to allow moving to tooltip
								setTimeout(() => {
									if (tooltipRef.current && !tooltipRef.current.matches(':hover')) {
										setShowTooltip(false);
									}
								}, 100);
							}}
							onFocus={() => setShowTooltip(true)}
							onBlur={() => {
								// Delay hiding to allow focusing on tooltip
								setTimeout(() => {
									if (tooltipRef.current && !tooltipRef.current.contains(document.activeElement)) {
										setShowTooltip(false);
									}
								}, 100);
							}}
							className="flex items-center justify-center"
							style={{
								width: '13px',
								height: '13px',
								cursor: 'help',
								border: 'none',
								background: 'transparent',
								padding: 0,
							}}
							aria-label={`Tooltip for ${label}`}
							aria-describedby={showTooltip ? `${property}-tooltip` : undefined}>
							<InfoIcon />
						</button>
						{showTooltip && (
							<div
								id={`${property}-tooltip`}
								role="tooltip"
								className="absolute z-[100] bottom-full left-0 mb-2 w-80 max-w-[90vw] p-3 bg-white border border-gray-300 shadow-lg"
								style={{
									fontFamily: 'var(--font-condensed)',
									fontSize: '12px',
									lineHeight: '16px',
									color: '#000',
									borderRadius: '4px',
								}}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
								dangerouslySetInnerHTML={{ __html: safeHtml(tooltip) }}
							/>
						)}
					</div>
				)}
			</div>

			{/* Dropdown Button */}
			<button
				id={property}
				role="combobox"
				aria-labelledby={property}
				aria-expanded={isOpen}
				aria-controls={`${property}-expanded-content`}
				title="Select filters"
				onClick={handleToggle}
				className="flex w-full items-center justify-between"
				style={{
					color: '#adb5bd',
					backgroundColor: 'white',
					fontFamily: 'var(--font-condensed)',
					fontWeight: 400,
					fontSize: '14px',
					lineHeight: '18px',
					borderRadius: 0,
					border: '1px solid #E0E3ED',
					padding: '10px 10px 10px 15px',
				}}>
					<div
						className="overflow-hidden"
						style={{
							color: 'rgb(107, 112, 119)',
							fontStyle: 'normal',
						}}>
						{displayText}
					</div>
				{isOpen ? (
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
						<path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				) : (
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
						<path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				)}
			</button>

			{/* Dropdown Content */}
			{isOpen && (
				<div
					id={`${property}-expanded-content`}
					className="absolute z-50 mt-1 w-full bg-white border border-[#E0E3ED] shadow-lg"
					style={{
						borderRadius: 0,
					}}>
					{/* Search Input */}
					<div className="p-3 border-b border-[#E0E3ED]">
						<input
							type="text"
							placeholder={`Search ${label}`}
							aria-label={`Search ${label}`}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="w-full px-3 py-2 border border-[#E0E3ED] focus:outline-none focus:ring-1 focus:ring-[#004E96]"
							style={{
								fontFamily: 'var(--font-condensed)',
								fontSize: '14px',
								lineHeight: '18px',
								borderRadius: 0,
							}}
						/>
					</div>

					{/* Options List */}
					<div className="max-h-[300px] overflow-y-auto">
						{filteredOptions.length > 0 ? (
							<div className="p-2">
								{filteredOptions.map((option) => {
									const isChecked = state.values?.includes(option.value) || false;
									return (
										<label
											key={option.value}
											className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
										>
											<input
												type="checkbox"
												checked={isChecked}
												onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
												className="mr-2 h-4 w-4"
												style={{
													accentColor: '#004E96',
												}}
											/>
											<span
												style={{
													fontFamily: 'var(--font-condensed)',
													fontSize: '14px',
													lineHeight: '18px',
													color: '#000',
												}}>
												{option.label}
											</span>
										</label>
									);
								})}
							</div>
						) : (
							<div
								className="p-3 text-center text-gray-500"
								style={{
									fontFamily: 'var(--font-condensed)',
									fontSize: '14px',
								}}>
								No options found
							</div>
						)}
					</div>

				</div>
			)}
		</div>
	);
}

export default FilterDropdown;
