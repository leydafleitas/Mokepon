let ataqueJugador
let ataqueEnemigo   
let resultado
let vidasJugador = 3
let vidasEnemigo = 3

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'flex'

    let seleccion;
    if(document.getElementById('Hipodoge').checked == true){
        seleccion = 'HIPODOGE';
    } else if (document.getElementById('Capipepo').checked == true){
        seleccion = 'CAPIPEPO';
    } else if(document.getElementById('Ratigueya').checked == true){
        seleccion = 'RATIGUEYA';
    } else{
        seleccion = null
    }
    if (seleccion != null){
        //alert('SELECCIONASTE TU MASCOTA ' + seleccion)
        document.getElementById('mascota-jugador').innerHTML = seleccion
    } else {
        alert('DEBES DE SELCCIONAR UNA MASCOTA')
    }

    seleccionarMascotaEnemigo()

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let numero = aleatorio(1,3)
    let seleccionEnemigo
    if (numero == 1){
        seleccionEnemigo = 'HIPODOGE'
    } else if (numero == 2){
        seleccionEnemigo = 'CAPIPEPO'
    } else{
        seleccionEnemigo = 'RATIGUEYA'
    }

    //alert('EL ENEMIGO SELECCIONO LA MASCOTA '+ seleccionEnemigo)
    document.getElementById('mascota-enemigo').innerHTML = seleccionEnemigo
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioEnemigo()
    crearMensaje() 
}

function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioEnemigo()
    crearMensaje()
}

function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioEnemigo()
    crearMensaje()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)

    if (ataqueAleatorio == 1){
        ataqueEnemigo = 'FUEGO'
    }else if(ataqueAleatorio == 2){
        ataqueEnemigo = 'AGUA'
    }else{
        ataqueEnemigo = 'TIERRA'
    }

}

function revisarVidas(){
    if(vidasEnemigo == 0 || vidasJugador == 0){
        finalizarJuego()
        let sectionReiniciar = document.getElementById('Reiniciar')
        sectionReiniciar.style.display = 'flex'
    }
}

function finalizarJuego(){
    document.getElementById('boton-fuego').disabled = true
    document.getElementById('boton-agua').disabled = true
    document.getElementById('boton-tierra').disabled = true

    let sectionMensajes = document.getElementById('resultado')

    if (vidasEnemigo == 0){
        sectionMensajes.innerHTML = '🎉 Ganaste la partida completa'
    }else{
        sectionMensajes.innerHTML = '💀 Perdiste la partida completa'
    }
}

function combate(){
    let spanVidasJugador = document.getElementById("vidas-jugador")
    let spanVidasEnemigo = document.getElementById("vidas-enemigo")

    if(ataqueJugador == ataqueEnemigo){
        resultado = 'EMPATARON'
    }else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        resultado = 'GANASTE'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        resultado = 'GANASTE'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        resultado = 'GANASTE'
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        resultado = 'PERDISTE'
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
}

function crearMensaje(){
    combate()

    let sectionMensajes = document.getElementById('resultado')
    let ataquesDelJugador = document.getElementById('ataques-del-jugador')
    let atquesDelEnemigo = document.getElementById('ataques-del-enemigo')

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    //sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    atquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

    revisarVidas()
    sectionMensajes.innerHTML = resultado

}

function reiniciarJuego(){
    location.reload()//esta es una funcion de html que vuelve a cargar la página
}

function iniciarJuego() {
    //seleccionar a la sección ataque para esconderla
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('Reiniciar')
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota') 
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

//Carga el documento .html y despues ejecuta la función Iniciar Juego
window.addEventListener('load', iniciarJuego)