let qtdInput = document.getElementsByClassName("quantidade");

qtdInput[0].addEventListener('input', validacaoQuantidade);

function validacaoQuantidade() {
    let valor = Number(qtdInput[0].value);

    if (valor < 0) {
        qtdInput[0].value = -1 * qtdInput[0].value;
    } else {
        return;
    }
}