// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Ref,
	Props,
	ReactElement as IReactElement
} from 'shared/ReactTypes';

export class ReactElement implements IReactElement {
	$$typeof = REACT_ELEMENT_TYPE;
	__mark = 'xuhan';
	constructor(
		public type: ElementType,
		public key: Key,
		public ref: Ref,
		public props: Props
	) {}
}

export const jsx = (
	type: ElementType,
	config: Record<string, unknown>,
	...maybeChildren: unknown[]
) => {
	const { key = null, ref = null, ...props } = config;
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength && maybeChildrenLength === 1) {
		props.children = maybeChildren[0];
	} else {
		props.children = maybeChildren;
	}
	return new ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: Record<string, unknown>) => {
	const { key = null, ref = null, ...props } = config;
	return new ReactElement(type, key, ref, props);
};
