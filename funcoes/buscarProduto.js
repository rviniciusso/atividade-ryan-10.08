const fs = require("fs");

const estoqueLoja = "./estoque/estoque.json";

function lerEstoque() {
    const estoque = fs.readFileSync(estoqueLoja, "utf-8");
    return JSON.parse(estoque);
}

function buscarProduto(id) {
    const item = lerEstoque();
    const numericId = Number(id);
    return item.find(item => item.id === numericId) || null;
}

module.exports = { buscarProduto };