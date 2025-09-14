import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { FiberFlags, NoFlags } from './fiberFlags';

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
	}
}
