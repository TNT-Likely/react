const render = (vdom, container) => {
    console.log("RENDER", vdom)

    /** 判定自定义组件 */
    if (vdom && typeof vdom.type === 'function') {
        const cmp = new vdom.type()
        console.log("CMP", vdom.type.prototype.render)
        vdom = cmp.render()
    }

    console.log("AFTER", vdom)
    
    container.appendChild(createDOM(vdom))
}

const createDOM = vdom => {
    if (typeof vdom === 'string' || !vdom) {
        return document.createTextNode(vdom || '')
    }

    /** 属性列表 */
    const attrs = Object.keys(vdom.props).filter(i => i !== 'children')

    /** 创建dom */
    const dom = document.createElement(vdom.type)

    /** 设置属性值 */
    attrs.forEach(attr => {
        setAttribute(dom, attr, vdom.props[attr])
    })
    
    const { children  = ''} = vdom.props
    if (Array.isArray(children)) {
        children.forEach(i => {
            dom.appendChild(createDOM(i))
        })
    } else {
        dom.appendChild(createDOM(children))
    }
    return dom
}

/**
 * 设置属性
 * @param dom 
 * @param attr 属性
 * @param value 属性值
 */
const setAttribute = (dom: HTMLElement, attr: string, value: any) => {
    /** 重置classname */
    if (attr === 'className') attr = 'class'

    /** 样式设置 */
    if (attr === 'style') {
        if (typeof value === 'string') {
            dom.style.cssText = value
        }

        if (typeof value === 'object') {
            for(let i in value) {
                dom.style[i] = value[i]
            }
        }
    } else if (/^on\w+/.test(attr)) {
        /** 匹配事件 */
        attr = attr.toLowerCase()
        dom[attr] = value
    } else {
        /** 通用属性设置 */
        if (value) {
            dom.setAttribute(attr, value)
        } else {
            dom.removeAttribute(attr)
        }
    }
   
}

export default {
    render
}