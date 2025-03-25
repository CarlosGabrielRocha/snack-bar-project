import { createElement, newMidiaElement } from "./create-elements"

let firstImg: HTMLImageElement
let lastImg: HTMLImageElement

/* Variável global usada para impedir que o usuário faça spam de cliques e quebre o fluxo do carrossel. */
let readyToScroll = true

const carouselSection = document.querySelector('#carousel') as HTMLElement
const urls = [
    './assets/images/placeholder-image1.webp',
    './assets/images/placeholder-image2.webp',
    './assets/images/placeholder-image3.webp',
    './assets/images/placeholder-image4.webp',
    './assets/images/placeholder-image5.webp'
]

let carouselIndex: number /* Variável global que acompanha a posição do carrossel. */
let isInteracting = false
let currentIntervalId = null
function handleAutoRotation() {
    if (isInteracting && currentIntervalId) {
        clearInterval(currentIntervalId)
        currentIntervalId = null
        console.log(isInteracting)
    } else if (!isInteracting && !currentIntervalId) {
        requestAnimationFrame(() => {
            currentIntervalId = setTimeout(() => {
                updateToRight()
                currentIntervalId = null
            }, 4000)
        })
        console.log(isInteracting)
    }
} 

export function renderCarousel() {
    const dotsContainer = document.querySelector('#pagination-dots') as HTMLElement
    const imgsContainer = document.querySelector('#imgs-container') as HTMLElement

    urls.forEach((url: string, index: number) => {
        const img = newMidiaElement('img', url)
        imgsContainer.appendChild(img)
        const dot = createElement('div', '', 'dot')

        /* O offsetWidth devolve a largura do container, isso está sendo usado para que o carrosel funcione da mesma forma independente da largura do container. */
        dot.addEventListener('click', () => {
            if (!imgsContainer.classList.contains('fluid-transition'))
                imgsContainer.classList.add('fluid-transition')
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * index}px)`
            removeMarkedDots()
            dot.classList.add('marked-dot')
            carouselIndex = index
        })

        dotsContainer.appendChild(dot)
    })

    const imgs = imgsContainer.querySelectorAll('img')
    firstImg = imgs[0].cloneNode() as HTMLImageElement
    lastImg = imgs[imgs.length - 1].cloneNode() as HTMLImageElement

    /* Faz com que o primeiro ponto sempre comece marcado. */
    dotsContainer.querySelectorAll('.dot')[0].classList.add('marked-dot')
    carouselIndex = 0

    /* Cuidando da rolagem automâtica do carrrossel e da interação do usuário para que não ocorra
    conflitos. */
        handleAutoRotation()
        carouselSection.addEventListener('click', () => {
            // Por conta do usuário conseguir clicar várias vezes, a condição abaixo evita quebrar a aplicação.
            if (!isInteracting) {
                isInteracting = true
                handleAutoRotation()
            }
        })
    
        carouselSection.addEventListener('transitionend', () => {
            isInteracting = false
            handleAutoRotation()   
        }) 
 
        carouselSection.addEventListener('pointerout', () => {
            if (isInteracting) {
                isInteracting = false
                handleAutoRotation()
            }
        })

        window.addEventListener('resize', () => {
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`
        })

    arrowsLogic()
}

/* Lógica da interação do usuário com as setas. */

function arrowsLogic() {
    const leftArrow = document.querySelector('.left-arrow-container')
    const rightArrow = document.querySelector('.right-arrow-container')
    leftArrow.addEventListener('click', updateToLeft)
    rightArrow.addEventListener('click', updateToRight)
}

/* Permite uma transição fluída quando o carrossel chegar no final. */

function updateToRight() {
    const imgsContainer = document.querySelector('#imgs-container') as HTMLElement
    if (!imgsContainer.classList.contains('fluid-transition'))
        imgsContainer.classList.add('fluid-transition')
    const dots = document.querySelectorAll('.dot')

    if (readyToScroll) {
        readyToScroll = false    

        if (carouselIndex >= dots.length - 1) {        
            imgsContainer.appendChild(firstImg)
            
            carouselIndex++
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`

            imgsContainer.addEventListener('transitionend', () => {
                imgsContainer.classList.remove('fluid-transition')
                imgsContainer.style.transform = `translateX(0px)`
                imgsContainer.removeChild(firstImg)
            }, {once: true})

            carouselIndex = 0
        } else {
            carouselIndex++
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`
        }

    }
    
    imgsContainer.addEventListener('transitionend', () => readyToScroll = true, {once: true})
    updateDots()
}

/* Permite uma transição fluída quando o carrossel passar o inicio. */

function updateToLeft() {
    const imgsContainer = document.querySelector('#imgs-container') as HTMLElement
    if (!imgsContainer.classList.contains('fluid-transition'))
        imgsContainer.classList.add('fluid-transition')
    const dots = document.querySelectorAll('.dot')

    if (readyToScroll) {
        readyToScroll = false

        if (carouselIndex <= 0) {
            imgsContainer.prepend(lastImg)

            imgsContainer.classList.remove('fluid-transition')
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth}px)`

            setTimeout(() => {
                imgsContainer.classList.add('fluid-transition')
                imgsContainer.style.transform = `translateX(0px)`
            }, 50)

            imgsContainer.addEventListener('transitionend', () => {
                imgsContainer.classList.remove('fluid-transition')
                imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * (dots.length - 1)}px)`
                imgsContainer.removeChild(lastImg)
            }, {once: true})

            carouselIndex = dots.length - 1
        } else {
            carouselIndex--
            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`  
        }
    }

    imgsContainer.addEventListener('transitionend', () => readyToScroll = true, {once: true})
    updateDots()
}

function updateDots() {
    const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLElement>
    removeMarkedDots()
    dots[carouselIndex].classList.add('marked-dot')
}

function removeMarkedDots() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('marked-dot'))
}


