let ind = 0;
Show(ind);

function Proximo(n) {
    Show(ind += n);
}

function Show(n) {

    let slides = document.getElementsByClassName("card-fundadoras");

    // Verificação do valor do indice
    if (n > slides.length) {
        ind = 1;
    }

    if (n < 1) {
        ind = slides.length
    }

    //--------------------------------

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[ind - 1].style.display = "block";
}