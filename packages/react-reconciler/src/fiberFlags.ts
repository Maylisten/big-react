export const NoFlags = 0b0000001;
export const Placement = 0b000010;
export const Update = 0b000100;
export const ChildDeletion = 0b001000;

export type FiberFlags =
	| typeof NoFlags
	| typeof Placement
	| typeof Update
	| typeof ChildDeletion;

export const MutationMask = Placement | Update | ChildDeletion;
