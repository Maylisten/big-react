// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Ref,
	Props,
	ReactElementType as IReactElement
} from 'shared/ReactTypes';

export class ReactElement implements IReactElement {
	$$typeof = REACT_ELEMENT_TYPE;
	__mark = 'xuhan';
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;

	constructor(type: ElementType, key: Key, ref: Ref, props: Props) {
		this.type = type;
		this.key = key;
		this.ref = ref;
		this.props = props;
	}
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
