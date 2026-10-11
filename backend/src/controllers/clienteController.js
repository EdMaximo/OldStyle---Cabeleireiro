import express from "express";
import { AppDataSource } from "../database/config.js";
import cliente from "../model/cliente.js";

const route = express.Router();

const table = AppDataSource.getRepository(cliente);

route.get("/", (request, response) => {
    return response.status(200).send("Beleza, funcionou!!! :P Viva longa a casa automatica")
});

route.post("/", async (request, response) => {
    const {name, email, password, telefone} = request.body

    try
    {
        const dataCliente = table.create({name, email, password, telefone});

        await table.save(dataCliente);

        return response.status(200).send({response: "Cadastro feito com sucesso!! XD"});
    }
    catch(error)
    {
        return response.status(500).send({response: error})
    }
});

export default route;