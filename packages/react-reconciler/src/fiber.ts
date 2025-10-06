import { Container, Instance } from 'hostConfig';
import { Key, Props, Ref } from 'shared/ReactTypes';
import { FiberFlags, NoFlags } from './fiberFlags';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { ReactElement } from 'react/src/jsx';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: Instance | FiberRootNode | null;
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
	subTreeFlags: FiberFlags;
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
		this.subTreeFlags = NoFlags;
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
		wip.stateNode = current.stateNode;
		wip.alternate = current;
		current.alternate = wip;
	} else {
		wip.pendingProps = pendingProps;
	}
	wip.flags = NoFlags;
	wip.subTreeFlags = NoFlags;
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memorizedProps = current.memorizedProps;
	wip.memorizedState = current.memorizedState;
	return wip;
};

export const createFiberFromElement = (element: ReactElement) => {
	const { type, key, props } = element;
	let flagTag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		flagTag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的 type 类型', element);
	}
	const fiber = new FiberNode(flagTag, props, key);
	fiber.type = type;
	return fiber;
};
