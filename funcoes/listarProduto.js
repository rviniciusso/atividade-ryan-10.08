import fs from "fs";

const estoqueLoja = "./estoque/estoque.json";

function lerEstoque() {
    const estoque = fs.readFileSync(estoqueLoja, "utf-8");
    return JSON.parse(estoque);
}

function listarProduto() {
    return lerEstoque();
}

export { listarProduto }