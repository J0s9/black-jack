/*
Tipos Numericos
2-10 C = Clubs,
2-10 D = Diamonds,
2-10 H = Hearts,
2-10 S = Spades
Especiales
A, J, K, Q
*/
let     deck        = [];
const   tipos       = ['C','D','H','S'],
        especiales  = ['A','J','Q','K'];

let puntosJugador     = 0,
    puntosComputadora = 0;

const puntosHTML = document.querySelectorAll('small');

//Referencia HTML
const   btnPedir      = document.querySelector('#btnPedir'),
        btnNuevo      = document.querySelector('#btnNuevo'),
        btnDetener    = document.querySelector('#btnDetener');

const   divCartasJugador        = document.querySelector('#jugador-cartas'),
        divCartasComputadora    = document.querySelector('#computadora-cartas');


const crearDeck = () =>{

    for( let i = 2; i <= 10; i ++){
        for( let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return _.shuffle(deck);
}
crearDeck();

//Pedir Carta
const pedirCarta = () =>{
    if(deck.length === 0){
        throw 'No hay cartas en el Deck';
    }
    return deck.pop();
}
/*for(let i = 0; i <= 100; i++){
    pedirCarta();
}*/


//Valor de carta "2 al 11"
const valorCarta = (carta) =>{  
    const valor  = carta.substring(0, carta.length -1);
    return (isNaN(valor)) ?
    (valor === 'A')? 11: 10
    : valor * 1;
}

//Turno computadora
const turnoComputadora = (puntosMinimos) =>{
    
    do{
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;
    
    const   imgCarta = document.createElement('img');
            imgCarta.src = `../assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if(puntosMinimos >= 21){
                break;
            }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() =>{
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana :(');
        }else if(puntosMinimos >= 21){
            alert('Computadora Gana');
        }else if(puntosComputadora >= 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana');
        }
    }, 100)

}

/*let carta = pedirCarta(),
    valor = valorCarta(carta);
    console.log(valor);*/
    
    btnPedir.addEventListener('click', () =>{
        
        const carta = pedirCarta();
        
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;
        const   imgCarta = document.createElement('img');
            imgCarta.src = `../assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugador.append(imgCarta);
        
        if(puntosJugador > 21){
            console.warn('Lo siento mucho perdiste');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }else if(puntosJugador === 21){
            console.warn('21 genial!..');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }
});

btnDetener.addEventListener('click',() =>{
    btnDetener.disabled = true;
    btnPedir.disabled   = true;
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () =>{
    
    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0] = 0;
    puntosHTML[1] = 0;

    divCartasComputadora.innerText = '';
    divCartasJugador.innerText = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});