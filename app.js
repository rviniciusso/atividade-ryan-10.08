const express = require("express");
const rotas = require("./rotas/rotas.js");

const app = express();

app.use(express.json());
app.use('/produtos', rotas);

module.exports = app;