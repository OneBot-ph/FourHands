if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {

    let totalCarrinho = document.querySelector("#totalCarrinho");
    let btncarrinho = document.getElementById("nav-carrinho");

    btncarrinho.addEventListener('click', MostrarCarrinho);

    let btnRemover = document.getElementsByClassName("removerCarrinho");
    for (let i = 0; i < btnRemover.length; i++) {
        btnRemover[i].addEventListener('click', RemoverCarrinho)
    }


    const quantidadeInput = document.getElementsByClassName("quantidade");
    for (let i = 0; i < quantidadeInput.length; i++) {
        quantidadeInput[i].addEventListener("change", AtualizacaoTotal);
    }

    const btnAddCarrinho = document.getElementsByClassName("adicionar-carrinho");
    for (let i = 0; i < btnAddCarrinho.length; i++) {
        btnAddCarrinho[i].addEventListener("click", addProduto);
    }

    const btnEnviarCarrinho = document.getElementById("enviarCarrinho");
    btnEnviarCarrinho.addEventListener("click", AtualizarEnviar)
}

let cardCompra = document.getElementsByClassName("card-compra");
let carrinho = document.getElementsByClassName("carrinho-compras");
let abrirPag = 0;
let valorTotal = 0;

function AtualizarEnviar() {
    if (valorTotal === "R$0,00") {
        alert("Seu carrinho esta vazio!")
    } else {
        alert(
        `Obrigado pela sua compra!
        Valor do pedido R$${valorTotal}
        Volte Sempre`
        )
    }
    carrinho.innerHTML = "";
    AtualizacaoTotal();
}



function addProduto(evento) {
    const btn = evento.target;
    const produtoInfo = evento.target.parentElement.parentElement;
    const produtoImg = produtoInfo.querySelector(".produtoimg").src;
    const produtoTitulo = produtoInfo.getElementsByClassName("nomePeca")[0].innerHTML;
    const produtoPreco = document.querySelector(".preco").innerHTML;

    const produtoCardNome = document.getElementsByClassName("nomePeca");

    // for (let i = 0; i < produtoCardNome.length; i++) {
    //     if (produtoCardNome[i].innerHTML == produtoTitulo) {
    //         produtoCardNome[i].parentElement.parentElement.getElementsByClassName("quantidade")[0].value;
    //         return;
    //     }
    // }

    let novoCardProduto = document.createElement("div");
    novoCardProduto.classList.add("card-compra");

    novoCardProduto.innerHTML =
        `
        <img src="${produtoImg}" alt="${produtoTitulo}">
        <div class="desc-card-compra">
            <h3>${produtoTitulo}</h3>
            <p class="desc-p">Descrição da peça:</p>
            <div class="grid">
                <div class="produto">
                    <p class="preco">${produtoPreco}</p>
                    <input type="number" class="quantidade" value="1">
                </div>
                    <div class="tamanho">
                        <button>P</button>
                </div>
        </div>
        <button class="removerCarrinho">Remover</button>
        `

    carrinho[0].append(novoCardProduto);
    AtualizacaoTotal();

    novoCardProduto.getElementsByClassName("quantidade")[0].addEventListener("change", AtualizacaoTotal);

    novoCardProduto.getElementsByClassName("removerCarrinho")[0].addEventListener('click', RemoverCarrinho);

}

function MostrarCarrinho() {
    if (abrirPag == 0) {
        carrinho[0].style.transform = "translateX(0px)";
        abrirPag = 1;
    } else {
        carrinho[0].style.transform = "translateX(600px)";
        abrirPag = 0;
    }
}


function txtParaNumero(txt) {
    let numero = txt.replace("R$", "").replace(",", ".");
    return numero;
}

function NumeroParatxt(numero) {
    numero = numero.toFixed(2);
    let txt = "R$ " + numero
    txt = txt.replace(".", ",");
    return txt;
}

function RemoverCarrinho(evento) {
    evento.target.parentElement.parentElement.remove();
    AtualizacaoTotal();
}

function AtualizacaoTotal() {

    for (let i = 0; i < cardCompra.length; i++) {
        const produtoPreco = txtParaNumero(cardCompra[i].getElementsByClassName("preco")[0].innerHTML);
        const produtoQuantidade = cardCompra[i].getElementsByClassName("quantidade")[0].value;

        valorTotal += produtoPreco * produtoQuantidade;
    }

    totalCarrinho.innerHTML = NumeroParatxt(valorTotal);

}