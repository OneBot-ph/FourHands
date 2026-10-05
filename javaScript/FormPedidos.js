let btnProximo = document.getElementById("proximoForm");
let btnAnterior = document.getElementById("anteriorForm");
let btnEnviar = document.getElementById("enviar");
let acompanhar = document.getElementsByClassName("circulo-acompanhar");
let gridAcompanhar = document.getElementsByClassName("grid-acompanhar");

let track = document.getElementById('track');
let slidesPe = [...track.children];
let indicePe = 0;

btnProximo.addEventListener("click", () => MostrarForm(indicePe + 1));

btnAnterior.addEventListener("click", () => MostrarForm(indicePe - 1));



function MostrarForm(valor) {
    if (valor < 0 || valor >= slidesPe.length) {
        return;
    }

    indicePe = valor;

    if (indicePe === 0) {
        btnAnterior.style.opacity = 0;
    } else {
        btnAnterior.style.opacity = 1;
    }

    if (indicePe < slidesPe.length - 1) {
        btnEnviar.style.display = "none";
        btnProximo.style.display = "flex";
        Confirmacao();
    } else {
        btnEnviar.style.display = "flex";
        btnProximo.style.display = "none"
    }

    acompanhar[indicePe].style.backgroundColor = "#fdcce6";
    gridAcompanhar[indicePe].style.opacity = 1;

    if (indicePe != 0 && indicePe < 5) {
        acompanhar[indicePe - 1].style.backgroundColor = "#8a5ca8";
        acompanhar[indicePe + 1].style.backgroundColor = "#8a5ca8";
        gridAcompanhar[indicePe - 1].style.opacity = .5;
        gridAcompanhar[indicePe + 1].style.opacity = .5;
    } else if (indicePe === 0) {
        acompanhar[indicePe + 1].style.backgroundColor = "#8a5ca8";
        gridAcompanhar[indicePe + 1].style.opacity = .5;
    } else if (indicePe >= 5) {
        acompanhar[indicePe - 1].style.backgroundColor = "#8a5ca8";
        gridAcompanhar[indicePe - 1].style.opacity = .5;
    }

    track.style.transform = `translateX(-${valor * 100}%)`
    btnAnterior.hidden = valor === 0;

}
MostrarForm(0);

