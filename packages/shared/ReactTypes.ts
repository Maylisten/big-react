export type Type = unknown;
export type Key = unknown;
export type Ref = unknown;
export type Props = Record<string, unknown>;
export type ElementType = unknown;

export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string;
}
