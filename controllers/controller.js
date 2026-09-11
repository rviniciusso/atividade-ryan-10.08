const buscar = require("../funcoes/buscarProduto.js");
const listar = require("../funcoes/listarProduto.js");
const cadastro = require("../funcoes/cadastrarProduto.js");
const logar = require("../funcoes/login.js");

exports.listarProduto = (req, res) => {
    const produtos = listar.listarProduto();
    return res.json(produtos);
};

exports.login = (req, res) => {
    const { email, senha } = req.body;
    const token = logar.login(email, senha);
    if (!token) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    return res.json({token});
};

exports.buscarProduto = (req, res) => {
    const { id } = req.params;
    const item = buscar.buscarProduto(id);
    if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    return res.json(item);
};

exports.cadastrarProduto = (req, res) => {
    const {  id, nome, preco, quantidade, categoria } = req.body;
    const missingFields = [];

    if (!id) missingFields.push('id');
    if (!nome) missingFields.push('nome');
    if (!preco) missingFields.push('preco');
    if (!quantidade) missingFields.push('quantidade');
    if (!categoria) missingFields.push('categoria');

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
        });
    }

    if (buscar.buscarProduto(id)) {
        return res.status(409).json({
            error: `Já existe um item com o ID ${id}`
        });
    }

    const itemCriado = cadastro.cadastrarProduto({ id, nome, preco, quantidade, categoria });
    return res.status(201).json(itemCriado);
};
