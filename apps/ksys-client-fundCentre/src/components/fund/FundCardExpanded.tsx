/**
 * FundCardExpanded Component
 * Expanded fund detail view matching reference layout (narrative left, Key Stats right)
 */

import type { Fund, FundCommentary, Shareclass } from '@/types/fund.types';
import type { ModuleId, FundType } from '@/types/fund-center.types';
import { Button } from '@/components/ui/button';
import FundManagers from './FundManagers';
import KeyStats from './KeyStats';
import { formatFundDisplayName } from '@/utils/fund-display-name';

function getPropertyValue(prop: unknown): string | undefined {
	if (prop == null) return undefined;
	if (typeof prop === 'object' && 'value' in prop && (prop as { value: unknown }).value != null) {
		return String((prop as { value: unknown }).value);
	}
	return String(prop);
}

/** First non-empty commentary whose `type` is in `types` (order = preference). */
function commentaryByTypes(commentaries: FundCommentary[] | undefined, types: string[]): string | undefined {
	if (!commentaries?.length) return undefined;
	for (const t of types) {
		const raw = commentaries.find((c) => c.type === t)?.content;
		if (raw != null && String(raw).trim() !== '') {
			return String(raw);
		}
	}
	return undefined;
}

export interface FundCardExpandedProps {
	fund: Fund;
	shareclass?: Shareclass;
	moduleId?: ModuleId;
	fundType?: FundType;
}

function FundCardExpanded({ fund, shareclass, fundType }: FundCardExpandedProps) {
	const activeShareclass = shareclass || fund.shareclasses[0];

	const fundName = formatFundDisplayName(fund.name || activeShareclass?.name || 'Unknown Fund', fundType);

	const urlType = getPropertyValue(activeShareclass?.properties?.url_type ?? fund.properties?.url_type);
	const urlSuffix = getPropertyValue(activeShareclass?.properties?.url_suffix ?? fund.properties?.url_suffix);
	const productPageHref = urlType && urlSuffix ? `/${urlType}/${urlSuffix}/` : undefined;

	const investmentApproach = commentaryByTypes(fund.commentaries, ['investment_approach']);
	const objective = commentaryByTypes(fund.commentaries, ['fund_objective', 'objective']);

	const sectionHeadingStyle = {
		color: 'var(--section-header)',
		fontFamily: 'var(--font-sans)',
		fontSize: '14px',
		lineHeight: '23px',
		letterSpacing: '0.02em',
	} as const;

	const bodyStyle = {
		color: 'var(--text-dark)',
		fontFamily: 'var(--font-sans)',
		fontSize: '16px',
		lineHeight: '24px',
		fontWeight: 400 as const,
	};

	return (
		<div className="fund-center-expanded-detail w-full">
			<div
				className="mb-10"
				style={{
					fontFamily: 'var(--font-sans)',
				}}>
				<div className="fund-center-expanded-title-row flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
					<h2
						className="fund-center-expanded-fund-name font-bold m-0"
						style={{
							color: '#1A1A1A',
							fontFamily: 'var(--font-sans)',
							fontSize: '32px',
							lineHeight: '1.2',
						}}>
						{fundName}
					</h2>
					{productPageHref && (
						<Button asChild variant="default" size="default" className="fund-center-expanded-product-btn shrink-0">
							<a
								href={productPageHref}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="View Product Page (opens in new tab)">
								View Product Page
							</a>
						</Button>
					)}
				</div>
			</div>

			<div className="fund-center-expanded-columns flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10 lg:gap-x-[60px] mb-8">
				<div className="fund-center-expanded-narrative min-w-0 w-full lg:max-w-[min(100%,60%)] lg:flex-1">
					{fund.fundManagers && fund.fundManagers.length > 0 && (
						<FundManagers
							managers={fund.fundManagers}
							baseUrl={import.meta.env.VITE_KURTOSYS_API_URL || 'https://api-us.fundpress.io'}
							token={import.meta.env.VITE_KURTOSYS_API_TOKEN}
						/>
					)}

					{investmentApproach && (
						<div className="fund-center-expanded-section mb-8 mt-2">
							<h2 className="fund-center-expanded-section-title mb-4 text-lg font-bold uppercase" style={sectionHeadingStyle}>
								Investment Approach
							</h2>
							<p style={bodyStyle}>{investmentApproach}</p>
						</div>
					)}

					{objective && (
						<div className="fund-center-expanded-section mb-2">
							<h2 className="fund-center-expanded-section-title mb-4 text-lg font-bold uppercase" style={sectionHeadingStyle}>
								Objective
							</h2>
							<p style={bodyStyle}>{objective}</p>
						</div>
					)}
				</div>

				<div className="fund-center-expanded-aside w-full shrink-0 lg:ml-auto lg:w-full lg:max-w-[400px]">
					<KeyStats fund={fund} shareclass={activeShareclass} />
				</div>
			</div>
		</div>
	);
}

export default FundCardExpanded;
