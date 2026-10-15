(function () {
    function iniciar() {
        const cards = document.querySelectorAll(".flip-card");
        const semMouse = window.matchMedia("(hover: none)");

        function alternar(card) {
            const virado = card.classList.toggle("virado");
            card.setAttribute("aria-pressed", virado);
        }

        cards.forEach(function (card) {
            card.addEventListener("click", function () {
                if (semMouse.matches) alternar(card);
            });

            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    alternar(card);
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
