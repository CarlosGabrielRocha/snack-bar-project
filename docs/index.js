/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/carousel.ts":
/*!*************************!*\
  !*** ./src/carousel.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderCarousel: () => (/* binding */ renderCarousel)\n/* harmony export */ });\n/* harmony import */ var _create_elements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-elements */ \"./src/create-elements.ts\");\n\nlet firstImg;\nlet lastImg;\n/* Variável global usada para impedir que o usuário faça spam de cliques e quebre o fluxo do carrossel. */\nlet readyToScroll = true;\nconst carouselSection = document.querySelector('#carousel');\nconst urls = [\n    './assets/images/placeholder-image1.webp',\n    './assets/images/placeholder-image2.webp',\n    './assets/images/placeholder-image3.webp',\n    './assets/images/placeholder-image4.webp',\n    './assets/images/placeholder-image5.webp'\n];\nlet carouselIndex; /* Variável global que acompanha a posição do carrossel. */\nlet isInteracting = false;\nlet currentIntervalId = null;\nfunction handleAutoRotation() {\n    if (isInteracting && currentIntervalId) {\n        clearInterval(currentIntervalId);\n        currentIntervalId = null;\n        /* console.log(isInteracting) */\n    }\n    else if (!isInteracting && currentIntervalId === null) {\n        requestAnimationFrame(() => {\n            currentIntervalId = setTimeout(() => {\n                updateToRight();\n                currentIntervalId = null;\n            }, 4000);\n        });\n        /* console.log(isInteracting) */\n    }\n}\nfunction renderCarousel() {\n    const dotsContainer = document.querySelector('#pagination-dots');\n    const imgsContainer = document.querySelector('#imgs-container');\n    urls.forEach((url, index) => {\n        const img = (0,_create_elements__WEBPACK_IMPORTED_MODULE_0__.newMidiaElement)('img', url);\n        imgsContainer.appendChild(img);\n        const dot = (0,_create_elements__WEBPACK_IMPORTED_MODULE_0__.createElement)('div', '', 'dot');\n        /* O offsetWidth devolve a largura do container, isso está sendo usado para que o carrosel funcione da mesma forma independente da largura do container. */\n        dot.addEventListener('click', () => {\n            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * index}px)`;\n            removeMarkedDots();\n            dot.classList.add('marked-dot');\n            carouselIndex = index;\n        });\n        dotsContainer.appendChild(dot);\n    });\n    const imgs = imgsContainer.querySelectorAll('img');\n    firstImg = imgs[0].cloneNode();\n    lastImg = imgs[imgs.length - 1].cloneNode();\n    /* Faz com que o primeiro ponto sempre comece marcado. */\n    dotsContainer.querySelectorAll('.dot')[0].classList.add('marked-dot');\n    carouselIndex = 0;\n    /* Cuidando da rolagem automâtica do carrrossel e da interação do usuário para que não ocorra\n    conflitos. */\n    handleAutoRotation();\n    carouselSection.addEventListener('click', () => {\n        isInteracting = true;\n        handleAutoRotation();\n    });\n    carouselSection.addEventListener('transitionend', () => {\n        isInteracting = false;\n        handleAutoRotation();\n    });\n    carouselSection.addEventListener('pointerout', () => {\n        isInteracting = false;\n        handleAutoRotation();\n    });\n    window.addEventListener('resize', () => {\n        imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`;\n    });\n    arrowsLogic();\n}\n/* Lógica da interação do usuário com as setas. */\nfunction arrowsLogic() {\n    const leftArrow = document.querySelector('.left-arrow-container');\n    const rightArrow = document.querySelector('.right-arrow-container');\n    leftArrow.addEventListener('click', updateToLeft);\n    rightArrow.addEventListener('click', updateToRight);\n}\n/* Permite uma transição fluída quando o carrossel chegar no final. */\nfunction updateToRight() {\n    const imgsContainer = document.querySelector('#imgs-container');\n    if (!imgsContainer.classList.contains('fluid-transition'))\n        imgsContainer.classList.add('fluid-transition');\n    const dots = document.querySelectorAll('.dot');\n    if (readyToScroll) {\n        readyToScroll = false;\n        if (carouselIndex >= dots.length - 1) {\n            imgsContainer.appendChild(firstImg);\n            carouselIndex++;\n            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`;\n            imgsContainer.addEventListener('transitionend', () => {\n                imgsContainer.classList.remove('fluid-transition');\n                imgsContainer.style.transform = `translateX(0px)`;\n                imgsContainer.removeChild(firstImg);\n            }, { once: true });\n            carouselIndex = 0;\n        }\n        else {\n            carouselIndex++;\n            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`;\n        }\n    }\n    imgsContainer.addEventListener('transitionend', () => readyToScroll = true, { once: true });\n    updateDots();\n}\n/* Permite uma transição fluída quando o carrossel passar o inicio. */\nfunction updateToLeft() {\n    const imgsContainer = document.querySelector('#imgs-container');\n    if (!imgsContainer.classList.contains('fluid-transition'))\n        imgsContainer.classList.add('fluid-transition');\n    const dots = document.querySelectorAll('.dot');\n    if (readyToScroll) {\n        readyToScroll = false;\n        if (carouselIndex <= 0) {\n            imgsContainer.prepend(lastImg);\n            imgsContainer.classList.remove('fluid-transition');\n            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth}px)`;\n            setTimeout(() => {\n                imgsContainer.classList.add('fluid-transition');\n                imgsContainer.style.transform = `translateX(0px)`;\n            }, 50);\n            imgsContainer.addEventListener('transitionend', () => {\n                imgsContainer.classList.remove('fluid-transition');\n                imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * (dots.length - 1)}px)`;\n                imgsContainer.removeChild(lastImg);\n            }, { once: true });\n            carouselIndex = dots.length - 1;\n        }\n        else {\n            carouselIndex--;\n            imgsContainer.style.transform = `translateX(-${carouselSection.offsetWidth * carouselIndex}px)`;\n        }\n    }\n    imgsContainer.addEventListener('transitionend', () => readyToScroll = true, { once: true });\n    updateDots();\n}\nfunction updateDots() {\n    const dots = document.querySelectorAll('.dot');\n    removeMarkedDots();\n    dots[carouselIndex].classList.add('marked-dot');\n}\nfunction removeMarkedDots() {\n    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('marked-dot'));\n}\n\n\n//# sourceURL=webpack://lanchonete/./src/carousel.ts?");

/***/ }),

/***/ "./src/create-elements.ts":
/*!********************************!*\
  !*** ./src/create-elements.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createElement: () => (/* binding */ createElement),\n/* harmony export */   newAnchorElement: () => (/* binding */ newAnchorElement),\n/* harmony export */   newMidiaElement: () => (/* binding */ newMidiaElement)\n/* harmony export */ });\nfunction createElement(tag, id, ...className) {\n    const element = document.createElement(tag);\n    if (id)\n        element.id = id;\n    if (className)\n        element.classList.add(...className);\n    return element;\n}\nfunction newMidiaElement(tag, src, ...attributes) {\n    const element = document.createElement(tag);\n    element.src = src;\n    attributes.forEach((pair) => element.setAttribute(pair[0], pair[1]));\n    return element;\n}\nfunction newAnchorElement(href) {\n    const a = createElement('a');\n    a.href = href;\n    return a;\n}\n\n\n//# sourceURL=webpack://lanchonete/./src/create-elements.ts?");

/***/ }),

/***/ "./src/css/media-queries.css":
/*!***********************************!*\
  !*** ./src/css/media-queries.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lanchonete/./src/css/media-queries.css?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://lanchonete/./src/css/style.css?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./src/carousel.ts\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _css_media_queries_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/media-queries.css */ \"./src/css/media-queries.css\");\n\n\n\n(0,_carousel__WEBPACK_IMPORTED_MODULE_0__.renderCarousel)();\n\n\n//# sourceURL=webpack://lanchonete/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;