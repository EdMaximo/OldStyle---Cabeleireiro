import express from "express";
import clienteController from "../src/controllers/clienteController.js"

const routes = express();

routes.use("/cliente", clienteController);

export default routes;