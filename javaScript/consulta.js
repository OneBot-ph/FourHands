const URL_CONSULTA = "https://manual-broken-armed-promotes.trycloudflare.com/webhook/consulta-pedido";

const form = document.getElementById("formConsulta");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botao = form.querySelector("button[type='submit']");
    const textoOriginal = botao.textContent;
    const nome = document.getElementById("nomeCliente").value.trim();

    botao.disabled = true;
    botao.textContent = "Consultando...";
    resultado.textContent = "";

    try {
        const resp = await fetch(`${URL_CONSULTA}?name=${encodeURIComponent(nome)}`);
        if (!resp.ok) throw new Error("Erro " + resp.status);

        const dados = await resp.json();

        if (!dados.encontrado) {
            resultado.textContent = dados.mensagem || "Nenhum pedido encontrado.";
            return;
        }

        const lista = document.createElement("ul");
        dados.pedidos.forEach((p) => {
            const li = document.createElement("li");
            li.textContent = `${p.data} - ${p.tipo} - ${p.status}`;
            li.className = "pedido-card";
            lista.appendChild(li);
        });
        resultado.appendChild(lista);
    } catch (erro) {
        console.error(erro);
        resultado.textContent = "Não foi possível consultar agora. Tente novamente em instantes.";
    } finally {
        botao.disabled = false;
        botao.textContent = textoOriginal;
    }
});