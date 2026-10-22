/**
 * Global disclaimer footer for Fund Center tabs (CMS HTML via listdisclaimers).
 */
import { safeHtml } from '@/utils/safe-content';

export interface FundCenterTabDisclaimerProps {
	htmlContent: string;
}

function FundCenterTabDisclaimer({ htmlContent }: FundCenterTabDisclaimerProps) {
	if (!htmlContent.trim()) {
		return null;
	}

	return (
		<aside
			className="fund-center-overview-disclaimer mt-6 w-full min-w-0"
			aria-label="Important disclosure"
			// CMS-managed HTML from FundPress global disclaimers
			dangerouslySetInnerHTML={{ __html: safeHtml(htmlContent) }}
		/>
	);
}

export default FundCenterTabDisclaimer;
