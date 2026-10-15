(function () {
    function iniciar() {
        const header = document.querySelector(".place-navbar");
        const btnServicos = document.querySelector("#mostrarSrv");
        const submenu = document.querySelector(".servicos");
        const btnHamburguer = document.querySelector(".menu-toggle");

        if (btnServicos && submenu) {
            btnServicos.addEventListener("click", function () {
                submenu.classList.toggle("aberto");
            });
        }

        if (header && btnHamburguer) {
            btnHamburguer.addEventListener("click", function () {
                const aberto = header.classList.toggle("menu-aberto");
                btnHamburguer.setAttribute("aria-expanded", aberto);
                btnHamburguer.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
            });

            // fecha o menu ao escolher um link (as âncoras rolam a página)
            header.querySelectorAll(".paginas a[href], .servicos a[href]").forEach(function (link) {
                link.addEventListener("click", function () {
                    header.classList.remove("menu-aberto");
                    btnHamburguer.setAttribute("aria-expanded", "false");
                    btnHamburguer.setAttribute("aria-label", "Abrir menu");
                });
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();