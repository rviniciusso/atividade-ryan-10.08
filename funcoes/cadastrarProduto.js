const fs = require("fs");

const estoqueLoja = "./estoque/estoque.json";

function lerEstoque() {
    const estoque = fs.readFileSync(estoqueLoja, "utf-8");
    return JSON.parse(estoque);
}

function salvarEstoque(estoque) {
    const dados = JSON.stringify(estoque, null, 2);
    fs.writeFileSync(estoqueLoja, dados, "utf8");
}

function cadastrarProduto({ id, nome, preco, quantidade, categoria }) {
    const item = lerEstoque();
    const novoItem = {
        id: Number(id),
        nome,
        preco: Number(preco),
        categoria,
        estoque: Number(quantidade)
    };

    item.push(novoItem);
    salvarEstoque(item);

    return novoItem;
}

module.exports = { cadastrarProduto };