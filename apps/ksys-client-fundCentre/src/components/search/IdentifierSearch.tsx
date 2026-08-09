/**
 * IdentifierSearch Component
 * Fuzzy search input with debouncing
 */

import { useState, useEffect, useCallback, useRef } from 'react';

import { Input } from '@/components/ui/input';

export interface IdentifierSearchProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	autoSearchMinChar?: number;
	debounceMs?: number;
}

function IdentifierSearch({
	value,
	onChange,
	placeholder = 'Search funds...',
	autoSearchMinChar = 3,
	debounceMs = 300,
}: IdentifierSearchProps) {
	const [localValue, setLocalValue] = useState(value);
	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// Sync with external value
	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	// Debounced onChange
	useEffect(() => {
		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		debounceTimerRef.current = setTimeout(() => {
			// Only trigger search if meets minimum character requirement or is empty
			if (localValue.length === 0 || localValue.length >= autoSearchMinChar) {
				onChange(localValue);
			}
		}, debounceMs);

		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, [localValue, onChange, autoSearchMinChar, debounceMs]);

	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value);
	}, []);

	return (
		<div className="w-full">
			<Input
				type="text"
				value={localValue}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full"
			/>
			{localValue.length > 0 && localValue.length < autoSearchMinChar && (
				<p className="mt-1 text-xs text-muted-foreground">
					Type at least {autoSearchMinChar} characters to search
				</p>
			)}
		</div>
	);
}

export default IdentifierSearch;

