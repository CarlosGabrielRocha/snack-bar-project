import { createElement, newMidiaElement } from "./create-elements"

const sectionCarousel = document.querySelector('#carousel') as HTMLElement
const dotsContainer = document.querySelector('#pagination-dots') as HTMLElement 
const imgsContainer = document.querySelector('#imgs-container') as HTMLElement

const urls = [
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp'
]

let carouselIndex: number /* Variável global que acompanha a posição do carrossel. */

let userIsInteracting = false
let currentIntervalId: any
function handleAutoRotation() {
    if (userIsInteracting === true) {
        clearInterval(currentIntervalId)
    } else {
        currentIntervalId = setInterval(() => {
            updateCarousel('right')
        }, 5000) 
    }
}

/* Renderiza o carrossel */
export function renderCarousel() {  

    urls.forEach((url: string, index: number) => {
        const img = newMidiaElement('img', url)
        img.dataset.index = String(index)
        imgsContainer.appendChild(img) 
        const dot = createElement('div', '', 'dot') 

        /* O offsetWidth devolve a largura do container, isso está sendo usado para que o carrosel
        funcione da mesma forma independente da largura do container. Responsivo. */
        dot.addEventListener('click', () => {
            imgsContainer.scroll({left: imgsContainer.offsetWidth * index, behavior: 'smooth'})
        })

        dotsContainer.appendChild(dot)
        observerImage(img, dot)
    })
    
    /* Faz com que o primeiro ponto sempre comece marcado quando a página carregar. 
    Isso é necessário pois o intersection observer não está percebendo que a primeira imagem
    está aparecendo na viewport quando a página carrega.
    */
    window.addEventListener('load', () => {
        removeMarkedDots()
        dotsContainer.querySelectorAll('.dot')[0].classList.add('marked-dot')
        carouselIndex = 0    
    })

    /* Cuidando da rolagem automâtica do carrrossel e da interação do usuário para que não cause
    conflitos. */
    handleAutoRotation()
    sectionCarousel.addEventListener('pointerdown', () => {
        userIsInteracting = true
        handleAutoRotation()
    })

    sectionCarousel.addEventListener('pointerup', () => {
        userIsInteracting = false
        handleAutoRotation()
    })
    
    arrowsLogic()
}

/* Fornece dinâmismo ao carrossel (função utilizada pela rolagem automâmatica) */

/* A diferença entre o scroll e o scrollBy é que o scroll trabalha de forma absoluta e o scrollBy
de forma relativa. */

function updateCarousel(direction: 'right' | 'left') {
    const dots = document.querySelectorAll('.dot')

    if (carouselIndex >= dots.length - 1) {
        imgsContainer.scroll({left: 0})
    } else if (direction === 'right') {
        imgsContainer.scrollBy({left: imgsContainer.offsetWidth, behavior: 'smooth'})
        carouselIndex++ 
    } else if ((direction === 'left')) {
        imgsContainer.scrollBy({left: -imgsContainer.offsetWidth, behavior: 'smooth'})
        carouselIndex--
    }
}

/* Lógica da interação do usuário com as setas. */

function arrowsLogic() {
    const dots = document.querySelectorAll('.dot')
    const leftArrow = document.querySelector('.arrow-left')
    const rightArrow = document.querySelector('.arrow-right')

    leftArrow.addEventListener('click', () => {
        if (carouselIndex <= 0) {
            imgsContainer.scroll({left: 200000})
        } else {
            imgsContainer.scrollBy({left: -imgsContainer.offsetWidth, behavior: 'smooth'})
            carouselIndex--
        } 
    })

    rightArrow.addEventListener('click', () => {
       if (carouselIndex >= dots.length - 1) {
            imgsContainer.scroll({left: 0})
        } else { 
            imgsContainer.scrollBy({left: imgsContainer.offsetWidth, behavior: 'smooth'})
            carouselIndex++
        } 
    }) 

}

/* Essa função utiliza a API intersectionObserver para observa a imagem. A função callback 
    é chamada sempre que a imagem estiver aparecendo 90% na viewport.*/

function observerImage(img: HTMLElement, dot: HTMLElement) {
 
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeMarkedDots()
                dot.classList.add('marked-dot')
                carouselIndex = Number(img.dataset.index)
            }
        })

    }, {threshold: 0.5})

    observer.observe(img)
}


function removeMarkedDots() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('marked-dot'))
}  








