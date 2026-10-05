//http://127.0.0.1:5678/webhook-test/Formulário' || http://n8n:5678/webhook-test/Formulário'
const urlWebhook = "http://127.0.0.1:5678/webhook/formulario";
let form = document.getElementById("pedido");
let botao = document.getElementById("enviar");

form.addEventListener('submit', async function enviarDadosN8n(dados) {
    dados.preventDefault();
    const lista = Object.fromEntries(new FormData(form));
    botao.innerHTML = "enviando";

    try {
        const resposta = fetch(urlWebhook, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify(
                lista
            ),
        });
        console.log(lista);
        botao.innerHTML = "pedido enviado";
        botao.style.backgroundColor = "#c1d591"

    }catch(error){
        console.log("Error" + error);
    }
});
