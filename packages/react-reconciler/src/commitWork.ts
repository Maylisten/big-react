import { appendChildToContainer, Container, Instance } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { MutationMask, NoFlags, Placement } from './fiberFlags';
import { HostComponent, HostRoot, HostText } from './workTags';

export function commitMutationEffects(finishedWork: FiberNode) {
	let nextEffect: FiberNode | null = finishedWork;
	while (nextEffect !== null) {
		const child: FiberNode | null = nextEffect?.child;
		if (child !== null && (child?.subTreeFlags & MutationMask) !== NoFlags) {
			nextEffect = child;
		} else {
			up: while (nextEffect !== null) {
				commitMutationEffectOnFiber(nextEffect);
				const sibling: FiberNode | null = nextEffect.sibling;
				if (sibling !== null) {
					nextEffect = sibling;
					break up;
				} else {
					nextEffect = nextEffect.return;
				}
			}
		}
	}
}

function commitMutationEffectOnFiber(finishedWork: FiberNode) {
	const flags = finishedWork.flags;
	if ((flags & Placement) === Placement) {
		commitPlacement(finishedWork);
		finishedWork.flags &= ~Placement;
	}
}

function commitPlacement(finishedWork: FiberNode) {
	const hostParent = getHostParent(finishedWork);
	if (__DEV__) {
		console.warn('执行placement操作 hostParent', hostParent);
	}
	if (hostParent !== null) {
		appendPlacementNodeIntoContainer(finishedWork, hostParent);
	}
}

function getHostParent(fiber: FiberNode) {
	let parent = fiber.return;
	while (parent !== null) {
		const parentTag = parent.tag;
		if (parentTag === HostComponent) {
			return parent.stateNode as Container;
		}
		if (parentTag === HostRoot) {
			return (parent.stateNode as FiberRootNode).container;
		}
		parent = parent.return;
	}

	if (__DEV__) {
		console.warn('未找到 Host Parent');
	}
	return null;
}

function appendPlacementNodeIntoContainer(
	finishedWork: FiberNode,
	hostParent: Container
) {
	if ([HostComponent, HostText].includes(finishedWork.tag)) {
		appendChildToContainer(hostParent, finishedWork.stateNode as Instance);
		return;
	}
	const child = finishedWork.child;
	if (child !== null) {
		appendPlacementNodeIntoContainer(child, hostParent);

		let sibling = child.sibling;
		while (sibling !== null) {
			appendPlacementNodeIntoContainer(sibling, hostParent);
			sibling = sibling.sibling;
		}
	}
}
