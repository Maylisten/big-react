import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { createWorkInProgress, FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

function prepareRefreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memorizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}

function workLoop() {
	while (workInProgress) {
		performUnitOfWork(workInProgress);
	}
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// TODO: 调度
	const root = markUpdateFromFiberToRoot(fiber);
	if (root) {
		renderRoot(root);
	}
}

export function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode as FiberRootNode;
	}
	return null;
}

export function renderRoot(root: FiberRootNode) {
	prepareRefreshStack(root);
	do {
		try {
			workLoop();
		} catch (error) {
			if (__DEV__) {
				console.error('workLoop 发生错误', error);
			}
			workInProgress = null;
		}
	} while (true);
}
