import express from "express";
import rotas from "./rotas.js";

const app = express();

app.use(express.json());
app.use('/lojaboA', rotas);

export default app;