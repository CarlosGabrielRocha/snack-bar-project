export function createElement(tag: string, id?: string, ...className: string[]) {
    const element = document.createElement(tag)
    if (id) element.id = id
    if (className) element.classList.add(...className)
    
    return element
}

type AttributesPair = [string, string]
type MidiaElement = 'img' | 'video'

export function newMidiaElement(tag: MidiaElement, src: string, ...attributes: AttributesPair[]) {
    const element = document.createElement(tag)
    element.src = src
    attributes.forEach((pair: AttributesPair) => element.setAttribute(pair[0], pair[1]))
    return element as HTMLElement
}

export function newAnchorElement(href: string) {
    const a = createElement('a') as HTMLAnchorElement
    a.href = href
    return a
}

export function newButton(id: string, className: string, ...attributes: AttributesPair[]) {
    const button = createElement('button', id, className) as HTMLButtonElement
    attributes.forEach((pair: AttributesPair) => button.setAttribute(pair[0], pair[1]))
    return button
}