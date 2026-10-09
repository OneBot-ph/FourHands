let form = document.getElementById("pedido");

function Confirmacao() {
    const lista = new FormData(form);

    const linhas = [
        ['Nome', lista.get('nome')],
        ['E-mail', lista.get('email')],
        ['Telefone', lista.get('telefone')],
        ['Para quem', lista.get('genero')],
        ['categoria', lista.get('categoria')],
        ['Tamanho', lista.get('tamanho')],
        ['Quantidade', lista.get('quantidade')],
        ['Caimento', lista.get('caimento')],
        ['Comprimento', lista.get('comprimento')],
        ['Cor', lista.get('cores')],
        ['Tecido', lista.get('tecido')]
    ];
    
    const resumo = document.getElementById('resumo');
    resumo.replaceChildren();

    linhas.forEach(([rotulo, valor]) => {
        const dt = document.createElement('dt');
        dt.textContent = rotulo;

        const dd = document.createElement('dd');
        dd.textContent = valor || '—';

        const grid = document.createElement('div');

        grid.append(dt, dd);

        resumo.append(grid);
    });
}