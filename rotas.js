import express from "express"
import { buscaritem, listarEstoque, adicionarItem, filtrarItem } from "./estoque/funcoes-estoque.js"

const router = express.Router(); 

router.get('/filtrar', (req, res) => {
    const { categoria } = req.query;
    if (categoria) {
        return res.json(filtrarItem(categoria));
    }
    return res.json(listarEstoque());
});

router.get('/buscar/:id', (req, res) => {
    const { id } = req.params;
    const item = buscaritem(id);
    if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
    }
    return res.json(item);
});

router.post('/', (req, res) => {
    const {  id, titulo, fabricante, quantidade, ano, categoria, preco } = req.body;
    const missingFields = [];

    if (id === undefined || id === null || id === "") missingFields.push('id');
    if (!titulo) missingFields.push('titulo');
    if (!fabricante) missingFields.push('fabricante');
    if (!quantidade) missingFields.push('quantidade');
    if (!ano) missingFields.push('ano');
    if (!categoria) missingFields.push('categoria');
    if (!preco) missingFields.push('preco');

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
        });
    }

    if (buscaritem(id)) {
        return res.status(409).json({
            error: `Já existe um item com o ID ${id}`
        });
    }

    const itemCriado = adicionarItem({ id, titulo, fabricante, quantidade, ano, categoria, preco });
    return res.status(201).json(itemCriado);
});

export default router;