import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import { processUpdateQueue, UpdateQueue } from './updateQueue';

import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, reconcileChildFibers } from './childFibers';

/**
 *
 * @param wip 当前正在工作的 fiber node
 * @returns
 */
export const beginWork = (wip: FiberNode): FiberNode | null => {
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn('beginWork 未实现的类型', wip.tag);
			}
			return null;
	}
};

function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memorizedState as ReactElementType;
	const updateQueue = wip.updateQueue as UpdateQueue<ReactElementType>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	// HostRoot 待更新的子 Element 节点从 updateQueue.shared.pending 上取
	const { memorizedState } = processUpdateQueue(baseState, pending);
	wip.memorizedState = memorizedState;
	const nextChildren = wip.memorizedState as ReactElementType;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	// HostComponent 待更新的子 Element 节点从 nextProps 上取
	const nextChildren = nextProps?.children as ReactElementType;
	reconcileChildren(wip, nextChildren);
	return wip.child;
}

/**
 *
 * @param wip 当前的工作节点
 * @param children 当前工作节点的子  reactElement
 */
function reconcileChildren(wip: FiberNode, children: ReactElementType | null) {
	const current = wip.alternate;
	if (current === null) {
		wip.child = mountChildFibers(wip, null, children);
	} else {
		wip.child = reconcileChildFibers(wip, current?.child, children);
	}
}

export const workLoop = () => {};
