const lbButton = document.getElementById('lbButton');
const cProdutos = document.getElementById('cProdutos');
lbButton.addEventListener('click', async () => {
    const response = await fetch('http://localhost:3001/produtos');
    const data = await response.json();

    cProdutos.innerHTML = data.map(p => `<p><strong>${p.nome}</strong> - R$ ${p.preco.toFixed(2)} Estoque: ${p.estoque} Categoria: ${p.categoria}</p>`)
    
    
})
const email = document.getElementById('email').value;
console.log('Email:', email);
const senha = document.getElementById('password').value;
console.log('Senha:', senha);
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/produtos/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log('Token armazenado no localStorage:', data.token);
});