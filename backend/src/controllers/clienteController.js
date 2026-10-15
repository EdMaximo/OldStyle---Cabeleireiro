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

    if (!name || !email || !password || !telefone) {
        return response.status(400).send({
            erro: "Preencha todos os campos!"
            
        })
    }

    if(name.length > 8) {
        return response.status(400).send({
            erro: "Insira o nome e sobrenome!"
        })
    }

    if(password)

    try
    {
        const dataCliente = table.create({name, email, password, telefone});

        await table.save(dataCliente);

        return response.status(200).send({response: "Cadastro feito com sucesso!! XD"});
    }
    catch(error)
    {
        return response.status(500).send({ erro: error.message })
    }
});

export default route;