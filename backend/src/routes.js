import express from "express";
import clienteController from "../src/controllers/clienteController.js"
import agendamentoController from "../src/controllers/agendamentoController.js"

const routes = express();

routes.use("/cliente", clienteController);

routes.use("/agendamento", agendamentoController);

export default routes;