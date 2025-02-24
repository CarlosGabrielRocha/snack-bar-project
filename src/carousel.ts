const imgsContainer = document.querySelector('#imgs-container')
const images = document.querySelectorAll('#imgs-container > img')
const urls = [
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp',
    './assets/images/placeholder-image.webp'
]

function updateCarousel() {
    const firstUrl = urls[0]
    urls.shift()
    urls.push(firstUrl)

    images.forEach((image: HTMLElement, indexof) => {
        image.style.transform = `translateX(${15 * indexof + 1}em)`
    })
    const newImg =
    images[0].remove()
    imgsContainer
}