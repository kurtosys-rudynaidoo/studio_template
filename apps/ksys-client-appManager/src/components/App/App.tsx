import { useAppInputs } from '@/hooks/useAppInputs';
import AppShell from '@/components/AppShell/AppShell';

interface AppProps {
	mountId?: string;
}

function App({ mountId }: AppProps) {
	const inputs = useAppInputs(mountId);

	return (
		<div
			data-ksys-app-template-id="ksys-app-manager"
			data-input-client-code={inputs.clientCode}
			data-input-culture={inputs.culture}
			{...(inputs.productType ? { 'data-input-product-type': inputs.productType } : {})}
			{...(inputs.fundList ? { 'data-input-fundlist': inputs.fundList } : {})}>
			<AppShell inputs={inputs} />
		</div>
	);
}

export default App;
