
const slidesDeInfo = document.querySelectorAll('.slide-item-information')
const slideInfo = document.querySelector('.slide-list-informations')
const buttonInfo = document.querySelectorAll('.button-information')
let slideIndex = 0
let slideOn = true

contaIndex(slideIndex)
setInterval(function () {
    contaIndex(slideIndex)
}, 3000)



function contaIndex() {
    setTimeout(() => {

        if (slideIndex < 3) {
            mudaSlide(slideIndex)
            ativeBotao()
            slideIndex = slideIndex + 1
        } else {
            slideIndex = 0
        }
    }, 1000);
}


function mudaSlide(slideIndex) {
    slideInfo.style.transform = `translateX(${(pegaPosicaoCentral(slideIndex))}px)`
}


function pegaPosicaoCentral(slideIndex) {
    const slide = slidesDeInfo[slideIndex]
    const slideWidth = slide.clientWidth
    const windowWidth = document.body.clientWidth
    const margin = (windowWidth - slideWidth) / 2
    const position = margin - (slideIndex * slideWidth)
    return position
}

function ativeBotao() {
    buttonInfo.forEach(function (botao, index) {
        botao.style.color = 'lightgray'
        if (index == slideIndex) {
            botao.style.color = '#044F4F'
        }
    });
}

buttonInfo.forEach(function (button, index) {
    button.addEventListener('click', function () {
        mudaSlide(index)
        slideIndex = index
        ativeBotao()
    })
})
