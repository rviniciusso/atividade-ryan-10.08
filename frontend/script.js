


const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    console.log('Email:', email);
    console.log('Senha:', senha);

    try {
        const response = await fetch('http://localhost:3001/produtos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro do servidor:', data.error || 'Falha na autenticação');
            return;
        }

        localStorage.setItem('token', data.token);
        console.log('Token armazenado no localStorage:', data.token);
        window.location.href = "./index.html";
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
    }
});