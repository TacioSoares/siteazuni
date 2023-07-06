
const bannerSlideLancamento = document.querySelector('.item-do-lancamento')
const slideLancamento = document.querySelectorAll('.item-lancamento-container')

let movimento = 0
let pontoInicial = 0
let pontoAtual = 0
let posicaoBanner = 0

function mouseEntrou(event) {
    posicao = bannerSlideLancamento.getClientRects()
    bannerSlideLancamento.style.animation = 'none'
    posicaoBanner = posicao[0].x
    moveSlide(posicaoBanner)

    if (event.type.includes('touch')) { // se for toque com touch
        iniciaMovimento(event.touches[0])
    }

    bannerSlideLancamento.addEventListener('mousedown', iniciaMovimento)

}


function iniciaMovimento(event) {
    posicaoInicial = event.clientX

    bannerSlideLancamento.addEventListener('dragstart', function(event) {
        event.preventDefault()
    })
    bannerSlideLancamento.addEventListener('mousemove', arrastaBanner)
    bannerSlideLancamento.addEventListener('touchmove', arrastaBanner) // EVENTO COM TOUCH
    bannerSlideLancamento.addEventListener('mouseup', function(){
        console.log('soltou')
        bannerSlideLancamento.removeEventListener('mousemove', arrastaBanner)
    })
    slide.addEventListener('touchend', function() {
        bannerSlideLancamento.removeEventListener('touchmove', arrastaBanner)
        bannerSlideLancamento.style.animation = 'slideON 40s 1s infinite alternate'
    })
}

function arrastaBanner(event) {
    movimento = event.clientX - posicaoInicial
    if (event.type.includes('touch')) { // se for toque com touch
        movimento = event.touches[0].clientX - posicaoInicial
    }
    const arraste = posicaoBanner + movimento
    moveSlide(arraste)
}

function moveSlide(posicao) {
    bannerSlideLancamento.style.transform = `translateX(${posicao}px)`
}

function moveBanner(event) {
    pontoAtual = event.clientX
    movimento =  pontoInicial - pontoAtual 
    console.log(movimento)
    marginLateral = (document.body.clientWidth - event.target.width)/2
    let posicao = ( pontoAtual - marginLateral )
    /* console.log(posicao) */
    /* console.log(`A soma entre posicao e movimento é ${posicao+movimento}`) */ 
    moveSlide(movimento)
}

slideLancamento.forEach((anuncio, index) => {
    anuncio.addEventListener('mouseenter', mouseEntrou)
    anuncio.addEventListener('touchstart', mouseEntrou)
    /* {
        
        anuncio.addEventListener('mousedown', function(event) {
            pontoInicial = event.clientX
            anuncio.addEventListener('dragstart', function(event) {
                event.preventDefault()
            })
            anuncio.addEventListener('mousemove', moveBanner)
            bannerSlideLancamento.addEventListener('mouseup', function(){
                console.log('soltou')
                anuncio.removeEventListener('mousemove', moveBanner)
            })
        })
    }) */
    
    anuncio.addEventListener('mouseout', function(){
        bannerSlideLancamento.style.animation = 'slideON 40s 1s infinite alternate'
    })
});