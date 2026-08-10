import fs from "fs";

const estoqueLoja = "./estoque/estoque.json";

function lerEstoque() {
    const estoque = fs.readFileSync(estoqueLoja, "utf-8");
    return JSON.parse(estoque);
}

function salvarEstoque(estoque) {
    const dados = JSON.stringify(estoque, null, 2);
    fs.writeFileSync(estoqueLoja, dados, "utf8");
}

function buscaritem(id) {
    const item = lerEstoque();
    const numericId = Number(id);
    return item.find(item => item.id === numericId) || null;
}

function listarEstoque() {
    return JSON.stringify(lerEstoque());
}

function adicionarItem({ id, titulo, fabricante, quantidade, ano, categoria, preco }) {
    const item = lerEstoque();
    const novoItem = {
        id: Number(id),
        titulo,
        fabricante,
        quantidade: Number(quantidade),
        ano: Number(ano),
        categoria,
        preco: Number(preco)
    };

    item.push(novoItem);
    salvarEstoque(item);

    return novoItem;
}

function filtrarItem(categoria) {
    const item = lerEstoque();
    return item.filter(item => item.categoria === categoria);
}

export { buscaritem, listarEstoque, adicionarItem, filtrarItem };