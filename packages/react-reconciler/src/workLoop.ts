import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workProgress: FiberNode | null = null;

function prepareRefreshStack(fiber: FiberNode) {
	workProgress = fiber;
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memorizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workProgress = sibling;
			return;
		}
		node = node.return;
		workProgress = node;
	} while (node !== null);
}

function workLoop() {
	while (workProgress) {
		performUnitOfWork(workProgress);
	}
}

export function renderRoot(root: FiberNode) {
	prepareRefreshStack(root);

	do {
		try {
			workLoop();
		} catch (error) {
			console.error('workLoop 发生错误', error);
			workProgress = null;
		}
	} while (true);
}
