let qtdInput = document.getElementsByClassName("quantidade");

for (let i = 0; i < qtdInput.length; i++) {
    qtdInput[i].addEventListener("input", function validacaoQuantidade() {
        let valor = Number(qtdInput[i].value);

        if (valor < 0) {
            qtdInput[i].value = -1 * qtdInput[i].value;
        } else {
            return;
        }
    }
    );
}