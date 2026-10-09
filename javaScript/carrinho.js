let totalCarrinho = document.querySelector("#totalCarrinho");
let trackCompras = document.getElementsByClassName("track");
let cardCompra = document.getElementsByClassName("card-compra");
let carrinho = document.getElementsByClassName("carrinho-compras");
let abrirPag = 0;
let valorTotal = 0;


function ready() {
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

    RestaurarCarrinho()

}

function RestaurarCarrinho() {
    const track = document.getElementsByClassName("track")[0];
    if (!track) {
        return;
    }

    LerCarrinho().forEach((item) => track.append(CriarCard(item)));
    AtualizacaoTotal();
}


function AtualizarEnviar() {
    document.getElementsByClassName("track")[0].innerHTML = "";
    AtualizacaoTotal();

}

function addProduto(evento) {
    const btn = evento.target;
    const produtoInfo = evento.target.parentElement.parentElement;
    const produtoImg = produtoInfo.querySelector(".produtoimg").src;
    const produtoTitulo = produtoInfo.querySelector(".nomePeca").innerHTML;
    const produtoPreco = produtoInfo.querySelector(".preco").innerHTML;
    const produtoQuantidade = produtoInfo.querySelector(".quantidade").value;

    const produtoCard = document.getElementsByClassName("nomePecaCard");
    const produtoCardTitulo = document.getElementsByClassName("nomePeca");

    for (let i = 0; i < produtoCard.length; i++) {
        if (produtoCard[i].innerHTML === produtoTitulo) {
            produtoCard[i].parentElement.getElementsByClassName("quantidade")[0].value++;
            AtualizacaoTotal();
            return;
        }
    }

    const novoCard = CriarCard({
        img: produtoImg,
        titulo: produtoTitulo,
        preco: produtoPreco,
        quantidade: produtoQuantidade,
    })

    document.getElementsByClassName("track")[0].append(novoCard);
    AtualizacaoTotal();
}

function CriarCard({ img, titulo, preco, quantidade }) {

    let novoCardProduto = document.createElement("div");
    novoCardProduto.classList.add("card-compra");

    novoCardProduto.innerHTML =
        `
        <img src="${img}" alt="${titulo}">
        <div class="desc-card-compra">
            <h3 class="nomePecaCard">${titulo}</h3>
            <p class="desc-p">Descrição da peça:</p>
            <div class="grid">
                <div class="produto">
                    <p class="preco">${preco}</p>
                    <input type="number" class="quantidade" value="${quantidade}" min="0">
                </div>
                    <div class="tamanho">
                        <button type="button">P</button>
                </div>
        </div>
        <button class="removerCarrinho" type="button">Remover</button>
        `;


    novoCardProduto.getElementsByClassName("quantidade")[0].addEventListener("change", AtualizacaoTotal);
    novoCardProduto.getElementsByClassName("removerCarrinho")[0].addEventListener('click', RemoverCarrinho);

    return novoCardProduto;
}


function RemoverCarrinho(evento) {
    evento.target.closest(".card-compra").remove();
    AtualizacaoTotal();
}

function AtualizacaoTotal() {
    let subTotal = 0;
    for (let i = 0; i < cardCompra.length; i++) {
        const produtoPreco = txtParaNumero(cardCompra[i].getElementsByClassName("preco")[0].innerHTML);
        const campoQuantidade = cardCompra[i].getElementsByClassName("quantidade")[0];
        let produtoQuantidade = Number(campoQuantidade.value);

        if (produtoQuantidade < 0) {
            produtoQuantidade = Math.abs(produtoQuantidade);
            campoQuantidade.value = produtoQuantidade; // campo e cálculo concordam
        }

        subTotal += produtoPreco * produtoQuantidade;
    }
    valorTotal = subTotal;
    totalCarrinho.innerHTML = NumeroParatxt(valorTotal);

    SalvarCarrinho();
}

//conversão de valores

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

// abrir Carrinho

function MostrarCarrinho() {
    if (abrirPag == 0) {
        carrinho[0].style.transform = "translateX(0px)";
        abrirPag = 1;
    } else {
        carrinho[0].style.transform = "translateX(600px)";
        abrirPag = 0;
    }
}


// Teste Salvar Carrinho

const chave_carrinho = "carrinhoFourHands";

function LerCarrinho() {
    try {
        return JSON.parse(localStorage.getItem(chave_carrinho)) || []
    } catch {
        return [];
    }
}

function SalvarCarrinho() {
    const itens = Array.from(cardCompra).map((card) =>
    ({
        img: card.querySelector("img").src,
        titulo: card.querySelector(".nomePecaCard").textContent.trim(),
        preco: card.querySelector(".preco").textContent.trim(),
        quantidade: card.querySelector(".quantidade").value,
    })
    );
    localStorage.setItem(chave_carrinho, JSON.stringify(itens));
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}