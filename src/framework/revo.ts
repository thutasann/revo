declare global {
	namespace JSX {
		interface Element {
			type: string | Function;
			props: any;
		}
		interface IntrinsicElements {
			[elemName: string]: any;
		}
		interface ElementChildrenAttribute {
			children: {};
		}
	}
}

/**
 * Revo JSX Factory
 */
export function Revo(type: string | Function, props: any, ...children: any[]) {
	if (typeof type === 'function') {
		return type({ ...props, children });
	}

	return {
		type,
		props: {
			...props,
			children: children.map((child) =>
				typeof child === 'object'
					? child
					: { type: 'TEXT_ELEMENT', props: { nodeValue: child } },
			),
		},
	};
}
