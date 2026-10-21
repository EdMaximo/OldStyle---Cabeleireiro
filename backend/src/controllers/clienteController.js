import express from "express";
import { AppDataSource } from "../database/config.js";
import cliente from "../model/cliente.js";

const route = express.Router();

const table = AppDataSource.getRepository(cliente);

const usersRepository = AppDataSource.getRepository(cliente);

route.get("/", (request, response) => {
    return response.status(200).send("Beleza, funcionou!!! :P Viva longa a casa automatica")
});

// get -> pegar
// route.get("/users", async (req, res) => {
//   const { id } = req.query;

//   if (!id) {
//     return res.status(404).send({ message: "ID can not be empty." })
//   }

//   try {
//     const users = await usersRepository.findOneBy({ id_cliente: String(id) });

//     if (!users) {
//         return res.status(404).send({ message: "User not found." })
//     }

//     // status code http -> 200 (OK)
//     return res.status(200).send({total: quantidade});

//   } catch {
//     throw new Error("Not possible get users.");
//   }

  
// });

// Pegando a quantidade de users para o totalusers (Admin)
route.get("/users", async (req, res) => {
  const { id } = req.query;

  try {
    const users = await usersRepository.count();

    // status code http -> 200 (OK)
    return res.status(200).send(users);

  } catch {
    throw new Error("Not possible get users.");
  }

  
});

route.post("/", async (request, response) => {
    const {name, email, password, telefone} = request.body

    // VALIDAR OS DADOS
    // // EXEMPLOS: NOME NÃO PODE TER NUMEROS, SENHA TEM QUE TER MAIS DE 8 CARACTERES, EMAIL TEM Q TER O @GMAIL, TELEFONE TEM QUE TER 15 DIGITOS
    const nomeRegex = /^[A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+)+$/;
    const senhaRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])^[\x21-\x7e]{1,60}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\([1-9]{2}\)\s?9?[0-9]{4}-?[0-9]{4}$/

    if (!nomeRegex.test(name) || !senhaRegex.test(password) || !emailRegex.test(email) || !telefoneRegex.test(telefone)){
        
        return
    }else {
       
        try
        {
            const dataCliente = table.create({name, email, password, telefone});
    
            await table.save(dataCliente);
    
            return response.status(200).send(dataCliente);

           
        }
        catch(error)
        {
            return response.status(500).send({response: error})
        }
    }
});

export default route;