import { createElement, newMidiaElement } from "./create-elements"

const urls = [
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp'
]

export function renderCarousel() {
    const imgsContainer = document.querySelector('#imgs-container') as HTMLElement
    const dotsContainer = document.querySelector('#pagination-dots') as HTMLElement 
    
    urls.forEach((url: string, index: number) => {
        const img = newMidiaElement('img', url, ['id', `item${index}`])
        imgsContainer.appendChild(img) 
        const dot = createElement('div', '', 'dot')  

        dot.addEventListener('click', () => {
            img.scrollIntoView({behavior: "smooth", block: "center", inline: 'center'})
        })

        dotsContainer.appendChild(dot)
        observerImage(img, dot)
    })

    removeMarkedDots()
}  

/* Essa função utiliza a API intersectionObserver para observa a imagem. A função callback 
    é chamada sempre que a imagem estiver aparecendo 90% na viewport.*/

function observerImage(img: HTMLElement, dot: HTMLElement) {
 
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeMarkedDots()
                dot.classList.add('marked-dot')
            }
        })

    }, {threshold: 0.9})

    observer.observe(img)
}

function removeMarkedDots() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('marked-dot'))
}  








