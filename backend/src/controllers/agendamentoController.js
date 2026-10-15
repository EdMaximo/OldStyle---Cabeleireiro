import express from "express";
import { AppDataSource } from "../database/config.js";
import agendamento from "../model/agendamento.js";

/* VALIDAR OS DADOS, COMO O USUARIOI VAI COLOCAR OS DADOS, ACHO Q NÃO PRECISA TANTO MAS DÁ UMA OLHADA */

const route = express.Router();

const table = AppDataSource.getRepository(agendamento);

//só pra testar se ta funcionando
route.get("/teste", (request, response) => {
    return response.status(200).send("Beleza, funcionou!!! :P Viva longa a casa automatica")
});

// Aonde vai salvar o agendamento
route.post("/", async (request, response) => {
    const {data_hora, corte, cabelereiro, cliente} = request.body // requisita as informações do front. no caso do corte,cabelereiro e cliente ele so vai pegar o id deles.

    try
    {
        const dadosAgendamento = table.create({data_hora, corte, cabelereiro, cliente});

        await table.save(dadosAgendamento);

        return response.status(200).send({response: "Agendamento feito com sucesso!! XD"});
    }
    catch(error)
    {
        console.error("Erro ao salvar agendamento:", error);
        return response.status(500).json({ mensagem: "Erro interno no servidor." });
    }
});

//get que mostrará todos os agendamentos feitos
route.get("/listarAgendamentos", async (request, response) => {
    try
    {
        const listaAgendamentos = await table.find({ //manda fazer uma busca na table(onde estão as informaçoes)
            relations: {
                corte: true, //busca o corte daquele agendamento
                cabelereiro: true, // busca qual o cabelereiro do agendamento
                cliente: true // mostra de qual cliente é aquele agendamento
            }
        });

        return response.status(200).json({ agendamentos: listaAgendamentos });
    }
    catch(error)
    {
        console.error("Erro ao buscar todos os agendamentos:", error);
        return response.status(500).json({ mensagem: "Erro interno no servidor." });
    }
});

export default route;