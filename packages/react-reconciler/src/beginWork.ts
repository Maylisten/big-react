import { FiberNode } from './fiber';

export const beginWork = (wip: FiberNode): FiberNode | null => {
	return wip;
};

export const workLoop = () => {};
