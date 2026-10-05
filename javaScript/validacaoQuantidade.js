let input = document.getElementById("quantidade");

input.addEventListener('input', validacaoQuantidade);

function validacaoQuantidade(){
    let valor = Number(input.value);

    if(valor < 0){
        input.value = -1 * input.value;
    }else{
        return;
    }
}