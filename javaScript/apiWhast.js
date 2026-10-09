//http://127.0.0.1:5678/webhook-test/Formulário' || http://n8n:5678/webhook-test/Formulário'

let formularios = document.querySelectorAll(".formularioEnvio");
const urlWebhook = "http://127.0.0.1:5678/webhook/formulario";
formularios.forEach((form) => {

    form.addEventListener('submit', async function enviarDadosN8n(dados) {
        dados.preventDefault();

        const botao = form.querySelector('button[type="submit"]');
        const textOriginal = botao.textContent;

        const lista = Object.fromEntries(new FormData(form));
        lista.formulario = form.dataset.tipo;

        if (form.dataset.tipo === "carrinho") {
            const itens = coletarItensCarrinho(form);
            if (itens.length === 0) {
                alert("Seu carrinho está vazio.")
                return;
            }

            lista.itens = itens;
            lista.total = itens.reduce((soma, item) => soma + item.subtotal, 0);
        }

        botao.disabled = true;
        botao.textContent = "enviando...";

        console.log(lista);
        try {
            const resposta = await fetch(urlWebhook, {
                method: 'POST',
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify(lista),
            });


            if (!resposta.ok) throw new Error("Status " + resposta.status);
        } catch (error) {
            console.log("Erro ao enviar" + error);
            botao.textContent = "erro, tente novamente";
            botao.disabled = false;
            setTimeout(() => (botao.textContent = textOriginal), 3000);
        }

        botao.textContent = "pedido enviado";
        botao.style.backgroundColor = "#c1d591";
        form.reset();

        if (form.dataset.tipo === "carrinho") {
            AtualizarEnviar();
            alert(`Obrigado pela sua compra!\nValor do pedido: ${NumeroParatxt(lista.total)}`);
        }

        setTimeout(() => {
            botao.textContent = textoOriginal;
            botao.disabled = false;
            botao.style.backgroundColor = "";
        }, 3000);

    });
})

function coletarItensCarrinho(form) {
    const cards = form.querySelectorAll(".track .card-compra");

    return Array.from(cards)
        .map((card) => {
            const preco = txtParaNumero(card.querySelector(".preco").textContent);
            const quantidade = Number(card.querySelector(".quantidade").value);
            // const tamanhoSel = card.querySelector(".tamanho button.selecionado");

            return {
                titulo: card.querySelector(".nomePecaCard").textContent.trim(),
                preco,
                quantidade,
                // tamanho: tamanhoSel ? tamanhoSel.textContent.trim() : null,
                subtotal: preco * quantidade,
            };
        })
        .filter((item) => item.quantidade > 0);
}


