//Explicando o Código

//Criação de uma váriavel que carrega o documento html
//utilizei .bind para que precise escrever document.querySelector...
const $ = document.querySelector.bind(document);

//Criação de váriavel que carrega a estrutura html das tags
// img e input
const visuImg = $('.img');
const anexo = $('#arquivo');

// Para identificar se o usuario adicionou um anexo,
// Usei a variavel que carrega a estrutura input passando 
//  .onchage verificando se houve mudança, caso sim recebe a função:
anexo.onchange = function (e) {
    //obs: "e" é a estrutura input

    //atualizacao recebe a imagems
    const atualizacao = e.target.files.item(0);
    const reader = new FileReader();
    
    //objeto do tipo FileReader quando lido dispara a função "e"
    // que modifica a estrutura .img, adicionando o link da imagem
    //selecionada da primeira função
    reader.onload = e => visuImg.src = e.target.result;
    //acionamento do evento onload
    reader.readAsDataURL(atualizacao);
}
