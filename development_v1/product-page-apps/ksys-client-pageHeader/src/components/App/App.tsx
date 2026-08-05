import Widget from '@/components/Widget/Widget';

import type { WidgetProps } from '@/types/widget.types';

function App({ clientCode, culture, productType }: WidgetProps) {
	return (
		<main className="widget-app-wrapper bg-transparent p-0">
			<Widget
				clientCode={clientCode}
				culture={culture}
				productType={productType}
			/>
		</main>
	);
}

export default App;
