let btn = document.querySelector("#mostrarSrv")
let servico = document.getElementsByClassName("servicos");
let abrirPagSrv = 0;

if (abrirPagSrv == 0) {
    servico[0].style.display = "none"
    abrirPagSrv = 1;

}

btn.addEventListener("click", function ShowServicosNav() {
    if (abrirPagSrv == 0) {
        servico[0].style.display = "none"
        abrirPagSrv = 1;

    } else {
        servico[0].style.display = "grid"
        abrirPagSrv = 0;

    }

});