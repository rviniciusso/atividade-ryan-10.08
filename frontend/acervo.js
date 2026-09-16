const lbButton = document.getElementById('lbButton');
const cProdutos = document.getElementById('cProdutos');
const slvButton = document.getElementById('btnSalvar'); 

slvButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o envio do formulário e o recarregamento da página
    const nome = document.getElementById('nomeInput').value.trim();
    const preco = parseFloat(document.getElementById('precoInput').value);
    const quantidade = parseInt(document.getElementById('estoqueInput').value);
    const categoria = document.getElementById('categoriaInput').value.trim();

    const response = await fetch('http://localhost:3001/produtos/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco, quantidade, categoria })
    });
    
    const resultado = await response.json();
    console.log('Resultado do cadastro:', resultado);
    if (resultado.status == 201) {
        alert('Produto cadastrado com sucesso!');
    }else if (resultado.status == 400) {
        alert('campo ausente.');
    }else if (resultado.status == 409) {
        alert('Produto já existe.');
    }
    return resultado;
});

lbButton.addEventListener('click', async () => {
// 1. Pega o valor ATUALIZADO do input no momento do clique
    const barrafiltro = document.getElementById('filterInput').value.trim();

    // 2. Define a URL (com ou sem o parâmetro)
    let url = 'http://localhost:3001/produtos';
    if (barrafiltro) {
        url += '?filter=' + encodeURIComponent(barrafiltro);
    }
    console.log('URL de requisição:', url);

    // 3. Busca os dados na API
    const response = await fetch(url);
    const data = await response.json(); 

    cProdutos.innerHTML = data.map(p => `<p><strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)} Estoque: ${p.estoque} Categoria: ${p.categoria}</p>`);
});