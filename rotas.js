import express from "express"
import { buscarProduto } from "./funcoes/buscarProduto.js";
import { listarProduto } from "./funcoes/listarProduto.js";
import { cadastrarProduto } from "./funcoes/cadastrarProduto.js";

const router = express.Router(); 

router.get('/listar', (req, res) => {
    const produtos = listarProduto();
    return res.json(produtos);
});

router.get('/buscar/:id', (req, res) => {
    const { id } = req.params;
    const item = buscarProduto(id);
    if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    return res.json(item);
});

router.post('/cadastro', (req, res) => {
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

    if (buscarProduto(id)) {
        return res.status(409).json({
            error: `Já existe um item com o ID ${id}`
        });
    }

    const itemCriado = cadastrarProduto({ id, nome, preco, quantidade, categoria });
    return res.status(201).json(itemCriado);
});

export default router;