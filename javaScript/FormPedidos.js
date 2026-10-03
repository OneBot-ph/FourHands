//Captura o botão "proximo"
let btnProximo = document.getElementById("proximoForm");
//Captura o botão "anterior"
let btnAnterior = document.getElementById("anteriorForm");


//
let track = document.getElementById('track');
let slidesPe = [...track.children];
let indicePe = 0;

btnProximo.addEventListener("click", () => MostrarForm(indicePe + 1));

btnAnterior.addEventListener("click", () => MostrarForm(indicePe - 1));


//Função responsável por mostrar a proxima fotografia

function MostrarForm(valor){
    if(valor < 0 || valor >= slidesPe.length){
        return;
    }

    indicePe = valor;
    track.style.transform = `translateX(-${valor * 100}%)`
    slides.forEach((s, n) => s.inert = n !== i);
    btnAnterior.hidden = i === 0;
}

MostrarForm(0);