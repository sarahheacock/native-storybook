import { ReactNode } from 'react';

// ?selectedKind=atoms%2FButtonPrimary&selectedStory=Unfocused%20with%20no%20icon&full=0&addons=1&stories=1&panelRight=0
export interface searchObj {
    selectedKind: string;
    selectedStory: string;
    full?: string | number;
    stories?: string | number;
    panelRight?: string | number;
}

export const parseSearch = (search: string): any => (
    search
    .replace('?', '')
    .replace(/%2F/g, '/')
    .replace(/%20/g, ' ')
    .split(/&/g)
    .reduce((obj: any, str: string): any => {
        const arr = str.split('=');
        if (arr.length > 1) {
            const val = arr[1];
            obj[arr[0]] = parseInt(val, 10) || val;
        }
        return obj;
    }, {})
)

const getProps = (props: any): string => (
    Object.keys(props).reduce((str: string, key: string): string => {
        if (key === 'children' || key === 'style') {
            return str;
        }
        let val = props[key];

        if(typeof(val) === 'string') {
            val = `"${val}"`
        }
        if(typeof(val) === 'object') {
            val = JSON.stringify(val);
        }

        return `${str} ${key}=${val}`;
    }, '')
)

const createHtml = (children: ReactNode, componentType: string): string => {
    if (!children) {
        return '';
    }

    const currentNodes = (Array.isArray(children)) ? children: [children];

    return (currentNodes as Array<any>).reduce((str: string, node: any) => {
        // null
        if (!node) {
            return str;
        }

        // string
        console.log(node);
        if (!node.type) {
            return str + node;
        }

        const name = node.type && (node.type.name || node.type.displayName);
        const props = node.props || {};
        const currentChildren = (name === componentType) ?
            props && props.children:
            createHtml(props && props.children, componentType);

        // storied component
        if (!currentChildren) {
            return `
                ${str}
                <${name} ${getProps(props)} />
            `;
        }

        return `
            ${str}
            <${name} ${getProps(props)}>
                ${currentChildren}
            </${name}>
        `;

    }, '');
}

export const getChildren = (children: ReactNode, search: searchObj): string => {
    const { selectedKind } = search;
    const index = selectedKind.indexOf('/') + 1;
    const componentType = selectedKind.slice(index);
    // console.log(typeof(children), Array.isArray(children));
    // typeof(children);
    // if (Array.isArray(children)) {
    //     children.forEach(child => {
    //         console.log(typeof(child))
    //     })
    // }

    return createHtml(children, componentType);
}