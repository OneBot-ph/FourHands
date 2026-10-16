const PAGINAS = [

    { termos: ["menu", "home", "casa"], url: "index.html" },
    { termos: ["quem somos"], url: "html/quemSomos.html" },
    { termos: ["conjuntos", "conjunto"], url: "html/vitrineConjuntos.html" },
    { termos: ["vestidos", "vestido"], url: "html/vitrineVestidos.html" },
    { termos: ["camisas", "camisa"], url: "html/vitrineCamisas.html" },
    { termos: ["casaquetos", "casaqueto"], url: "html/vitrineCasaqueto.html" },
    { termos: ["shorts", "short's", "short"], url: "html/vitrineShorts.html" },
    { termos: ["moldes", "molde"], url: "#vitr-moldes" },
    { termos: ["pedidos personalizados", "personalizar", "roupas personalizadas"], url: "#place-pedido" },
    { termos: ["conhecer", "roupas", "vitrine"], url: "#acesso-vitrRoupas" },
];

(function () {
    function normalizar(texto) {
        return texto
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");
    }

    function encontrarPagina(digitado) {
        const busca = normalizar(digitado);
        if (!busca) return null;
        return PAGINAS.find(function (pagina) {
            return pagina.termos.some(function (termo) {
                return normalizar(termo) === busca;
            });
        }) || null;
    }

    function iniciar() {
        document.querySelectorAll(".pesquisa").forEach(function (form) {
            const input = form.querySelector("input");
            const lista = form.querySelector("datalist");
            const msg = form.querySelector(".pesquisa-msg");
            const raiz = form.dataset.raiz || "";

            if (lista) {
                PAGINAS.forEach(function (pagina) {
                    const opcao = document.createElement("option");
                    opcao.value = pagina.termos[0];
                    lista.append(opcao);
                });
            }

            function ir() {
                const pagina = encontrarPagina(input.value);

                if (pagina) {
                    msg.textContent = "";
                    form.classList.remove("nao-encontrado");
                    window.location.href = raiz + pagina.url;
                    return;
                }

                if (input.value.trim() === "") {
                    input.focus();
                    return;
                }

                msg.textContent = 'Nenhum resultado para "' + input.value.trim() + '".';
                form.classList.remove("nao-encontrado");
                void form.offsetWidth;
                form.classList.add("nao-encontrado");
            }

            form.addEventListener("submit", function (e) {
                e.preventDefault();
                ir();
            });

            input.addEventListener("input", function (e) {
                if (e.inputType === "insertReplacementText") ir();
                else {
                    msg.textContent = "";
                    form.classList.remove("nao-encontrado");
                }
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();