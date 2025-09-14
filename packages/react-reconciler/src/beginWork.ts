import { FiberNode } from './fiber';

export const beginWork = (wip: FiberNode): FiberNode | null => {
	console.log(wip);
	return null;
};
