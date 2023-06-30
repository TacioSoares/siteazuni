const bannerSlideLancamento = document.querySelector('.item-do-lancamento')
const slideLancamento = document.querySelectorAll('.item-lancamento-container')


function moveBanner(event) {
    console.log(event.clientX)
}


slideLancamento.forEach((anuncio, index) => {
    anuncio.addEventListener('mouseenter', function(){
        posicao = bannerSlideLancamento.getClientRects()
        bannerSlideLancamento.style.transform = `translateX(${posicao[0].x}px)`
        bannerSlideLancamento.style.animation = 'none'
        anuncio.addEventListener('mousedown', function(event) {
            anuncio.addEventListener('dragstart', function(event) {
                event.preventDefault()
            })
            anuncio.addEventListener('mousemove', moveBanner)
            anuncio.addEventListener('mouseup', function(){
                console.log('soltou')
                anuncio.removeEventListener('mousemove', moveBanner)
            })
        })
    })
    
    anuncio.addEventListener('mouseout', function(){
        bannerSlideLancamento.style.animation = 'slideON 40s 1s infinite alternate'
    })
});