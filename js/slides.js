'use strict'

const slideWrapper = document.querySelector('.slide-wrapper')
const slideList = document.querySelector('.slide-list')
const navPreviousButton = document.querySelector('.slide-nav-button-previous')
const navNextButton = document.querySelector('.slide-nav-button-next')
const controlsWrapper = document.querySelector('.slide-controls')
const slideItems = document.querySelectorAll('.slide-item')
const controlButtons = document.querySelectorAll('.slide-control-button')

const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    moviment: 0,
    currentSlideIndex: 0,
}

function onMouseDown(event, index) {
    const slide = event.currentTarget
    state.startingPoint = event.clientX
    state.currentPoint  = state.startingPoint - state.savedPosition
    state.currentSlideIndex = index
    console.log(state.currentSlideIndex)
    //console.log('ponto de partida', startingPoint )
    slide.addEventListener('mousemove', onMouseMove)
}

function onMouseMove(event) {
    state.moviment = event.clientX - state.startingPoint
    const position = event.clientX - state.currentPoint
    //console.log('movimento do mouse', moviment)
    slideList.style.transform = 'translateX('+position+'px)'
    state.savedPosition = position
}

function onMouseUp(event){
    const slide = event.currentTarget
    const slideWidth = slide.clientWidth
    console.log(slideWidth)
    if(state.moviment < -150) {
        const position = ((state.currentSlideIndex +1) * slideWidth)
        slideList.style.transform = 'translateX('+(-position)+'px)'
        state.savedPosition = -position
    } else if (state.moviment > 150) {
        const position = ((state.currentSlideIndex -1) * slideWidth)
        slideList.style.transform = 'translateX('+(-position)+'px)'
        state.savedPosition = -position
    } else {
        const position = ((state.currentSlideIndex) * slideWidth)
        slideList.style.transform = 'translateX('+(-position)+'px)'
        state.savedPosition = -position
    }
    slide.removeEventListener('mousemove', onMouseMove)
    //console.log('soltei o botão')
}

slideItems.forEach(function(slide, index) {
    slide.addEventListener('dragstart', function(event) {
        event.preventDefault()
    })
    slide.addEventListener('mousedown', function(event) {
        onMouseDown(event, index)
    }) 
    slide.addEventListener('mouseup', onMouseUp)
    
})