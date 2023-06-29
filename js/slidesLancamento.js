const bannerSlideLancamento = document.querySelector('.item-do-lancamento')
const slideLancamento = document.querySelectorAll('.item-lancamento-container')

slideLancamento.forEach(anuncio => {
    anuncio.addEventListener('mouseenter', function(){
        bannerSlideLancamento.style.animation = 'none'
    })
    anuncio.addEventListener('mouseout', function(){
        bannerSlideLancamento.style.animation = 'slideON 40s 1s infinite alternate'
    })
});