/**
 * ShareableLink Component
 * URL sharing with filters
 */

import { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { useShareableLink } from '@/hooks/useShareableLink';
import type { FundType, ModuleId } from '@/types/fund-center.types';
import type { FiltersState } from '@/types/filter.types';

export interface ShareableLinkProps {
	fundType: FundType;
	module: ModuleId;
	filters: FiltersState;
	confirmationText?: string;
}

function ShareableLink({
	fundType,
	module,
	filters,
	confirmationText = 'Link copied to clipboard!',
}: ShareableLinkProps) {
	const { copyShareableLink } = useShareableLink();
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		const success = await copyShareableLink({ fundType, module, filters });

		if (success) {
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		}
	}, [copyShareableLink, fundType, module, filters]);

	return (
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" onClick={handleCopy}>
				{copied ? confirmationText : 'Copy Shareable Link'}
			</Button>
			{copied && (
				<span className="text-sm text-muted-foreground">{confirmationText}</span>
			)}
		</div>
	);
}

export default ShareableLink;

