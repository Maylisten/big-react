export type Container = Element;
export type Instance = Element | Text;

export function createInstance(type: string, props: unknown): Instance {
	// TODO: 处理props
	return document.createElement(type);
}

export function createTextInstance(content: string) {
	return document.createTextNode(content);
}

export function appendInitialChild(
	parent: Container | Instance,
	child: Instance
) {
	parent.appendChild(child);
}

export const appendChildToContainer = appendInitialChild;
