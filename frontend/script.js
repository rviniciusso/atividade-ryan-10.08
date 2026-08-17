const lbButton = document.getElementById('lbButton');
const cProdutos = document.getElementById('cProdutos');
lbButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3001/produtos');
    const data = await response.json();

    cProdutos.innerHTML = data.map(p => `<p><strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)} Estoque: ${p.estoque} Categoria: ${p.categoria}</p>`)
    
    
})