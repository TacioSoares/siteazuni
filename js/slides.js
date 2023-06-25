'use strict'
let images = document.querySelectorAll('.image-slide')
let widthScreen = window.innerWidth
const slideWrapper = document.querySelector('.slide-wrapper')
const slideList = document.querySelector('.slide-list')
const navPreviousButton = document.querySelector('.slide-nav-button-previous')
const navNextButton = document.querySelector('.slide-nav-button-next')
const controlsWrapper = document.querySelector('.slide-controls')
let slideItems = document.querySelectorAll('.slide-item')
let controlButtons
let slideInterval



watchSizeOfScreen()

const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    moviment: 0,
    currentSlideIndex: 0,
}
//console.log(images[0].src)


function translateSlide(position){
    state.savedPosition = position
    slideList.style.transform = `translateX(${position}px)`
}

function getCenterPosition({ index }) {
    const slide = slideItems[index]
    const slideWidth = slide.clientWidth
    const windowWidth = document.body.clientWidth
    const margin = (windowWidth - slideWidth) / 2
    const position = margin - (index * slideWidth)
    return position
}

function setVisibleSlide({ index, animate }){
    if(index === 0 || index === slideItems.length - 1){
        index = state.currentSlideIndex
    }
    const position = getCenterPosition({ index: index })
    state.currentSlideIndex = index
    slideList.style.transition = animate === true ? 'transform 0.5s' : 'none'
    activeControlButton({ index })
    translateSlide(position)
}

function nextSlide() {
    setVisibleSlide({ index: state.currentSlideIndex + 1, animate: true })
}

function previousSlide() {
    setVisibleSlide({ index: state.currentSlideIndex - 1, animate: true })
}

function createControlButtons() {
    
    slideItems.forEach(function(){
        const controlButton = document.createElement('button')
        controlButton.classList.add("slide-control-button")
        controlButton.classList.add("material-symbols-outlined")
        controlButton.dataset.slide = 'control-button'
        controlButton.innerHTML='radio_button_unchecked'
        controlsWrapper.append(controlButton)
    })
}

function activeControlButton({ index }) {

    const slide = slideItems[index]
    const dataIndex = Number(slide.dataset.index)
    const controlButton = controlButtons[dataIndex]
    controlButtons.forEach(function(controlButtonItem) {
        controlButtonItem.classList.remove('active')
    })
    if(controlButton) {
        controlButton.classList.add('active')
    }
}

function createSlidesClones() {
    const firstSlide = slideItems[0].cloneNode(true)
    firstSlide.classList.add('slide-cloned')
    firstSlide.dataset.index = slideItems.length

    const secondSlide = slideItems[1].cloneNode(true)
    secondSlide.classList.add('slide-cloned')
    secondSlide.dataset.index = slideItems.length + 1

    const lastSlide = slideItems[slideItems.length -1].cloneNode(true)
    lastSlide.classList.add('slide-cloned')
    lastSlide.dataset.index = - 1

    const penultimateSlide = slideItems[slideItems.length -2].cloneNode(true)
    penultimateSlide.classList.add('slide-cloned')
    penultimateSlide.dataset.index = - 2

    slideList.append(firstSlide)
    slideList.append(secondSlide)
    slideList.prepend(lastSlide)
    slideList.prepend(penultimateSlide)

    slideItems = document.querySelectorAll('.slide-item')
    
    
}

function watchSizeOfScreen(){
    widthScreen = window.innerWidth

    images = document.querySelectorAll('.image-slide')

    if(widthScreen < 700) {
        if(!(images.length > 8)) {
            images.forEach(function(image, index){
                image.src = `./assets/imgs/imagem${index}.png`
            })
        } else {
            images.forEach(function(image, index){
                if(index > 1 && index < 10) {
                    image.src = `./assets/imgs/imagem${index -2}.png`
                }   
            })
            images[0].src = `./assets/imgs/imagem6.png`
            images[1].src = `./assets/imgs/imagem7.png`
            images[10].src = `./assets/imgs/imagem0.png`
            images[11].src = `./assets/imgs/imagem1.png`
        }
    } else {
        if(!(images.length > 8)) {
            images.forEach(function(image, index){
                image.src = `./assets/imgs/slide${index+1}.jpg`
            })
        } else {
            images.forEach(function(image, index){
                if(index > 1 && index < 10) {
                    image.src = `./assets/imgs/slide${index -1}.jpg`
                }   
            })
            images[0].src = `./assets/imgs/slide7.jpg`
            images[1].src = `./assets/imgs/slide8.jpg`
            images[10].src = `./assets/imgs/slide1.jpg`
            images[11].src = `./assets/imgs/slide2.jpg`
        }
        /* images.forEach(function(image, index){

            image.src = `./assets/imgs/slide${index+1}.jpg`
            if(images.length > 8){
                image.src = `./assets/imgs/slide${index-2}.jpg`
            }
            if(images.length > 8 && index < 3) {
                image.src = `./assets/imgs/slide${index + 5}.jpg`
            }
            if(images.length > 8 && index > 9) {
                image.src = `./assets/imgs/slide${Math.round(index / 5)}.jpg`
            }
        })
        /* if(images.length >8) {
            images[0].src = './assets/imgs/slide5.jpg'
            images[1].src = './assets/imgs/slide6.jpg'
            images[10].src = './assets/imgs/slide2.jpg'
            images[11].src = './assets/imgs/slide1.jpg'
        } */ 
    }
}

function onMouseDown(event, index) {
    const slide = event.currentTarget
    state.startingPoint = event.clientX
    state.currentPoint  = state.startingPoint - state.savedPosition
    state.currentSlideIndex = index
    slideList.style.transition = 'none'
    slide.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(event) {
    state.moviment = event.clientX - state.startingPoint
    const position = event.clientX - state.currentPoint
    translateSlide(position)
}

function onMouseUp(event){
    const pointsToMove = event.type.includes('touch') ? 50 : 150
    const slide = event.currentTarget
    const slideWidth = slide.clientWidth
    //console.log(slideWidth)
    if(state.moviment < -pointsToMove) { //---------PRÓXIMO SLIDE
        nextSlide()
    } else if (state.moviment > pointsToMove) { //--------- SLIDE ANTERIOR
        previousSlide()
    } else { //----------- MESMO SLIDE
        setVisibleSlide({ index: state.currentSlideIndex, animate: true })
    }

    slide.removeEventListener('mousemove', onMouseMove)
    //console.log('soltei o botão')
}

function onTouchStart(event, index) {
    event.clientX = event.touches[0].clientX
    onMouseDown(event, index)
    const slide = event.currentTarget
    slide.addEventListener('touchmove', onTouchMove)
}

function onTouchEnd(event) {
    onMouseUp(event)
    const slide = event.currentTarget
    slide.removeEventListener('touchmove', onTouchMove)
}

function onTouchMove(event) {
    event.clientX = event.touches[0].clientX
    onMouseMove(event)
}

function onControlButtonClick(index) {
    setVisibleSlide({ index: index + 2, animate: true })
}

function onSlideListTransitionEnd() {
    const slide = slideItems[state.currentSlideIndex]
    if(slide.classList.contains('slide-cloned') && Number(slide.dataset.index) > 0) {
        setVisibleSlide({index: 2, animate: false })
    }
    if(slide.classList.contains('slide-cloned') && Number(slide.dataset.index) < 0) {
        setVisibleSlide({index: slideItems.length - 3, animate: false })
    }
}

function setAutoPlay() {
    slideInterval = setInterval(function(){
        setVisibleSlide({index: state.currentSlideIndex + 1 , animate: true})
    },2500)
}

function setListeners() {

    controlButtons = document.querySelectorAll('.slide-control-button')

    controlButtons.forEach(function(controlButton, index){
        controlButton.addEventListener('click', function(event){
            onControlButtonClick(index)
        })
    })

    slideItems.forEach(function(slide, index) {
        slide.addEventListener('dragstart', function(event) {
            event.preventDefault()
        })
        slide.addEventListener('mousedown', function(event) {
            onMouseDown(event, index)
        }) 
        slide.addEventListener('mouseup', onMouseUp)

        // EVENTOS COM TOUCH

        slide.addEventListener('touchstart', function(event) {
            onTouchStart(event, index)
        }) 
        slide.addEventListener('touchend', onTouchEnd)
        
    })
    


    navNextButton.addEventListener('click', nextSlide)
    navPreviousButton.addEventListener('click', previousSlide)
    slideList.addEventListener('transitionend', onSlideListTransitionEnd)

    // ----- Mouse em cima das imagens ou do botão de passar manual do carrosel, pausa o automático do carrosel

    slideWrapper.addEventListener('mouseenter', function() {
        clearInterval(slideInterval)
    })
    slideWrapper.addEventListener('mouseleave', function() {
        setAutoPlay()
    })
    let resizeTimeout
    window.addEventListener('resize', function(){
        watchSizeOfScreen()
        this.clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function() {
            setVisibleSlide({ index: state.currentSlideIndex})
        },2000)
    })
}

function initSlider() {
    createControlButtons()
    createSlidesClones()
    setListeners()
    setVisibleSlide( {index: 2, animate: true} )
    setAutoPlay()
}

initSlider()
