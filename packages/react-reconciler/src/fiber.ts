import { Container } from 'hostConfig';
import { Key, Props, Ref } from 'shared/ReactTypes';
import { FiberFlags, NoFlags } from './fiberFlags';
import { WorkTag } from './workTags';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: unknown;
	type: unknown;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: Ref;
	pendingProps: Props | null;
	memorizedProps: Props | null;
	alternate: FiberNode | null;
	flags: FiberFlags;
	updateQueue: unknown;
	memorizedState: unknown;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;
		this.ref = null;
		this.pendingProps = pendingProps;
		this.memorizedProps = null;
		this.alternate = null;
		this.flags = NoFlags;
		this.updateQueue = null;
		this.memorizedState = null;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;

	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
) => {
	let wip = current.alternate;
	if (wip === null) {
		wip = new FiberNode(current.tag, pendingProps, current.key);
		wip.alternate = current;
	} else {
		wip.pendingProps = pendingProps;
	}
	wip.flags = NoFlags;
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memorizedProps = current.memorizedProps;
	wip.memorizedState = current.memorizedState;
	return wip;
};
