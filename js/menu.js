const menuOpcoes = document.querySelector('#menu-opcoes')
const menuHamburguer = document.querySelector('#menu-hamburguer')
let aberto = false

menuHamburguer.addEventListener('click', () => {

    if(!aberto) {
        menuOpcoes.style.left = '0px'
        menuOpcoes.style.marginTop = '33px'
        menuHamburguer.style.marginBottom = '100px'
        aberto = true
    } else {
        menuOpcoes.style.left = '-300px'
        menuOpcoes.style.marginTop = '0px'
        menuHamburguer.style.marginBottom = '0px'
        aberto = false
    }
    
})


/* document.addEventListener('touchmove', e =>{
    document.addEventListener('touchend', e =>{

        if(e.changedTouches[0].screenX < 1045) {
            console.log('Avançou a tela')
        }
        if(e.changedTouches[0].screenX > 1170) {
            console.log('Voltou a tela')
        }
    })
}) */