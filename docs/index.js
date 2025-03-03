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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.renderCarousel = renderCarousel;\nvar create_elements_1 = __webpack_require__(/*! ./create-elements */ \"./src/create-elements.ts\");\nvar sectionCarousel = document.querySelector('#carousel');\nvar dotsContainer = document.querySelector('#pagination-dots');\nvar imgsContainer = document.querySelector('#imgs-container');\nvar urls = [\n    './assets/images/placeholder-image.webp',\n    './assets/images/placeholder-image.webp',\n    './assets/images/placeholder-image.webp',\n    './assets/images/placeholder-image.webp',\n    './assets/images/placeholder-image.webp'\n];\nvar carouselIndex; /* Variável global que acompanha a posição do carrossel. */\nvar userIsInteracting = false;\nvar currentIntervalId;\nfunction handleAutoRotation() {\n    if (userIsInteracting === true) {\n        clearInterval(currentIntervalId);\n    }\n    else {\n        currentIntervalId = setInterval(function () {\n            updateCarousel('right');\n        }, 5000);\n    }\n}\n/* Renderiza o carrossel */\nfunction renderCarousel() {\n    urls.forEach(function (url, index) {\n        var img = (0, create_elements_1.newMidiaElement)('img', url);\n        img.dataset.index = String(index);\n        imgsContainer.appendChild(img);\n        var dot = (0, create_elements_1.createElement)('div', '', 'dot');\n        /* O offsetWidth devolve a largura do container, isso está sendo usado para que o carrosel\n        funcione da mesma forma independente da largura do container. Responsivo. */\n        dot.addEventListener('click', function () {\n            imgsContainer.scroll({ left: imgsContainer.offsetWidth * index, behavior: 'smooth' });\n        });\n        dotsContainer.appendChild(dot);\n        observerImage(img, dot);\n    });\n    /* Faz com que o primeiro ponto sempre comece marcado quando a página carregar.\n    Isso é necessário pois o intersection observer não está percebendo que a primeira imagem\n    está aparecendo na viewport quando a página carrega.\n    */\n    window.addEventListener('load', function () {\n        removeMarkedDots();\n        dotsContainer.querySelectorAll('.dot')[0].classList.add('marked-dot');\n        carouselIndex = 0;\n    });\n    /* Cuidando da rolagem automâtica do carrrossel e da interação do usuário para que não cause\n    conflitos. */\n    handleAutoRotation();\n    sectionCarousel.addEventListener('pointerdown', function () {\n        userIsInteracting = true;\n        handleAutoRotation();\n    });\n    sectionCarousel.addEventListener('pointerup', function () {\n        userIsInteracting = false;\n        handleAutoRotation();\n    });\n    arrowsLogic();\n}\n/* Fornece dinâmismo ao carrossel (função utilizada pela rolagem automâmatica) */\n/* A diferença entre o scroll e o scrollBy é que o scroll trabalha de forma absoluta e o scrollBy\nde forma relativa. */\nfunction updateCarousel(direction) {\n    var dots = document.querySelectorAll('.dot');\n    if (carouselIndex >= dots.length - 1) {\n        imgsContainer.scroll({ left: 0 });\n    }\n    else if (direction === 'right') {\n        imgsContainer.scrollBy({ left: imgsContainer.offsetWidth, behavior: 'smooth' });\n        carouselIndex++;\n    }\n    else if ((direction === 'left')) {\n        imgsContainer.scrollBy({ left: -imgsContainer.offsetWidth, behavior: 'smooth' });\n        carouselIndex--;\n    }\n}\n/* Lógica da interação do usuário com as setas. */\nfunction arrowsLogic() {\n    var dots = document.querySelectorAll('.dot');\n    var leftArrow = document.querySelector('.arrow-left');\n    var rightArrow = document.querySelector('.arrow-right');\n    leftArrow.addEventListener('click', function () {\n        if (carouselIndex <= 0) {\n            imgsContainer.scroll({ left: 200000 });\n        }\n        else {\n            imgsContainer.scrollBy({ left: -imgsContainer.offsetWidth, behavior: 'smooth' });\n            carouselIndex--;\n        }\n    });\n    rightArrow.addEventListener('click', function () {\n        if (carouselIndex >= dots.length - 1) {\n            imgsContainer.scroll({ left: 0 });\n        }\n        else {\n            imgsContainer.scrollBy({ left: imgsContainer.offsetWidth, behavior: 'smooth' });\n            carouselIndex++;\n        }\n    });\n}\n/* Essa função utiliza a API intersectionObserver para observa a imagem. A função callback\n    é chamada sempre que a imagem estiver aparecendo 90% na viewport.*/\nfunction observerImage(img, dot) {\n    var observer = new IntersectionObserver(function (entries) {\n        entries.forEach(function (entry) {\n            if (entry.isIntersecting) {\n                removeMarkedDots();\n                dot.classList.add('marked-dot');\n                carouselIndex = Number(img.dataset.index);\n            }\n        });\n    }, { threshold: 0.5 });\n    observer.observe(img);\n}\nfunction removeMarkedDots() {\n    document.querySelectorAll('.dot').forEach(function (dot) { return dot.classList.remove('marked-dot'); });\n}\n\n\n//# sourceURL=webpack://lanchonete/./src/carousel.ts?");

/***/ }),

/***/ "./src/create-elements.ts":
/*!********************************!*\
  !*** ./src/create-elements.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createElement = createElement;\nexports.newMidiaElement = newMidiaElement;\nexports.newAnchorElement = newAnchorElement;\nfunction createElement(tag, id) {\n    var _a;\n    var className = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        className[_i - 2] = arguments[_i];\n    }\n    var element = document.createElement(tag);\n    if (id)\n        element.id = id;\n    if (className)\n        (_a = element.classList).add.apply(_a, className);\n    return element;\n}\nfunction newMidiaElement(tag, src) {\n    var attributes = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        attributes[_i - 2] = arguments[_i];\n    }\n    var element = document.createElement(tag);\n    element.src = src;\n    attributes.forEach(function (pair) { return element.setAttribute(pair[0], pair[1]); });\n    return element;\n}\nfunction newAnchorElement(href) {\n    var a = createElement('a');\n    a.href = href;\n    return a;\n}\n\n\n//# sourceURL=webpack://lanchonete/./src/create-elements.ts?");

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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar carousel_1 = __webpack_require__(/*! ./carousel */ \"./src/carousel.ts\");\n__webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n(0, carousel_1.renderCarousel)();\n\n\n//# sourceURL=webpack://lanchonete/./src/index.ts?");

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