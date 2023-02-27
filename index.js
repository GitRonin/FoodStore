// Green Block
const greenBlock = document.querySelector('.green_block');
const greenBlockClose = greenBlock.querySelector('.green_block__close');

greenBlockClose.addEventListener('click', () => {
    greenBlock.classList.add('display_visibility_hide')
})
// Green Block

// Header
const headerPaginationItemsClick = document.querySelectorAll('.header__pagination__item');
headerPaginationItemsClick.forEach(item => {
    item.querySelector('.header__pagination__item__title').addEventListener('click', () => {
        const list = item.querySelector('.header__pagination__item__list');
        if (window.innerWidth <= 360) {
            item.querySelector('.header__pagination__item__accordion').classList.toggle('header__pagination__item__accordion__rotate__mobile')
        } else {
            item.querySelector('.header__pagination__item__accordion').classList.toggle('header__pagination__item__accordion__rotate')
        }
        list.classList.toggle('display_visibility_visible');
    })
})
// Header

// Burger
const header__burger = document.querySelector('.header__burger');
header__burger.addEventListener('click', () => {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const burger = document.querySelector('.burger');
    const closeBtn = document.querySelector('.header__burger__close');
    const burgerBtn = document.querySelector('.header__burger__img');
    main.classList.toggle('display_none');
    footer.classList.toggle('display_none');
    burger.classList.toggle('burger__header__visible')
    closeBtn.classList.toggle('display_block');
    burgerBtn.classList.toggle('display_none');
})

// Burger

// Slider
const carousel = document.querySelector('.instagram__slider');
const carouselContent = document.querySelector('.instagram__sliders');
const slides = document.querySelectorAll('.instagram__slider__item');
const arrayOfSlides = Array.prototype.slice.call(slides);
let carouselDisplaying;
let screenSize;
setScreenSize();
var lengthOfSlide;

function addClone() {
    const lastSlide = carouselContent.lastElementChild.cloneNode(true);
    lastSlide.style.left = (-lengthOfSlide) + "px";
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}
// addClone();

function removeClone() {
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
    const slides = document.querySelectorAll('.instagram__slider__item');
    let slidesArray = Array.prototype.slice.call(slides);
    let width = 0;

    slidesArray.forEach(function (el, i) {
        el.style.left = width + "px";
        width += lengthOfSlide;
    });
    addClone();
}
moveSlidesRight();

function moveSlidesLeft() {
    const slides = document.querySelectorAll('.instagram__slider__item');
    let slidesArray = Array.prototype.slice.call(slides);
    slidesArray = slidesArray.reverse();
    let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

    slidesArray.forEach(function (el, i) {
        maxWidth -= lengthOfSlide;
        el.style.left = maxWidth + "px";
    });
}

window.addEventListener('resize', setScreenSize);

function setScreenSize() {
    if (window.innerWidth >= 500) {
        carouselDisplaying = 5;
    }
    else if (window.innerWidth >= 300) {
        carouselDisplaying = 2;
    } else {
        carouselDisplaying = 1;
    }
    getScreenSize();
}

function getScreenSize() {
    const slides = document.querySelectorAll('.instagram__slider__item');
    let slidesArray = Array.prototype.slice.call(slides);
    lengthOfSlide = (carousel.offsetWidth / carouselDisplaying);
    let initialWidth = -lengthOfSlide;
    slidesArray.forEach(function (el) {
        // el.style.width = lengthOfSlide + "px";
        el.style.left = initialWidth + "px";
        initialWidth += lengthOfSlide;
    });
}


const rightNav = document.querySelector('.arrow_right');
rightNav.addEventListener('click', moveLeft);

let moving = true;
function moveRight() {
    if (moving) {
        moving = false;
        const lastSlide = carouselContent.lastElementChild;
        lastSlide.parentNode.removeChild(lastSlide);
        carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
        removeClone();
        const firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', activateAgain);
        moveSlidesRight();
    }
}

function activateAgain() {
    const firstSlide = carouselContent.firstElementChild;
    moving = true;
    firstSlide.removeEventListener('transitionend', activateAgain);
}

const leftNav = document.querySelector('.arrow_left');
leftNav.addEventListener('click', moveRight);

let moveLeftAgain = true;

function moveLeft() {
    if (moving) {
        moving = false;
        removeClone();
        const firstSlide = carouselContent.firstElementChild;
        firstSlide.addEventListener('transitionend', replaceToEnd);
        moveSlidesLeft();
    }
}

function replaceToEnd() {
    const firstSlide = carouselContent.firstElementChild;
    firstSlide.parentNode.removeChild(firstSlide);
    carouselContent.appendChild(firstSlide);
    firstSlide.style.left = ((arrayOfSlides.length - 1) * lengthOfSlide) + "px";
    addClone();
    moving = true;
    firstSlide.removeEventListener('transitionend', replaceToEnd);
}

carouselContent.addEventListener('mousedown', seeMovement);

let initialX;
let initialPos;
function seeMovement(e) {
    initialX = e.clientX;
    getInitialPos();
    carouselContent.addEventListener('mousemove', slightMove);
    document.addEventListener('mouseup', moveBasedOnMouse);
}

function slightMove(e) {
    if (moving) {
        const movingX = e.clientX;
        const difference = initialX - movingX;
        if (Math.abs(difference) < (lengthOfSlide / 4)) {
            slightMoveSlides(difference);
        }
    }
}

function getInitialPos() {
    const slides = document.querySelectorAll('.instagram__slider__item');
    let slidesArray = Array.prototype.slice.call(slides);
    initialPos = [];
    slidesArray.forEach(function (el) {
        const left = Math.floor(parseInt(el.style.left.slice(0, -2)));
        initialPos.push(left);
    });
}

function slightMoveSlides(newX) {
    const slides = document.querySelectorAll('.instagram__slider__item');
    let slidesArray = Array.prototype.slice.call(slides);
    slidesArray.forEach(function (el, i) {
        const oldLeft = initialPos[i];
        el.style.left = (oldLeft + newX) + "px";
    });
}

function moveBasedOnMouse(e) {
    const finalX = e.clientX;
    if (initialX - finalX > 0) {
        moveRight();
    } else if (initialX - finalX < 0) {
        moveLeft();
    }
    document.removeEventListener('mouseup', moveBasedOnMouse);
    carouselContent.removeEventListener('mousemove', slightMove);
}
// Slider
