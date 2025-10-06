import {
	createContainer,
	updateContainer
} from 'react-reconciler/src/FiberReconciler';
import { Container } from './hostConfig';
import { ReactElement } from 'react/src/jsx';

export function createRoot(container: Container) {
	const root = createContainer(container);
	return {
		render(element: ReactElement) {
			updateContainer(element, root);
		}
	};
}

export const mark = '__xuhan__';
