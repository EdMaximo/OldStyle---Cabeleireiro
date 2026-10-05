import express from "express";
import { AppDataSource } from "./database/config.js";
import routes from "./routes.js";

const server = express();
server.use(express.json());
server.use("/", routes);

AppDataSource.initialize().then(() => {
    console.log("Conectado ao Banco de Dados")

    server.listen(3333, () => {
        console.log("Server is running :P")
    });
}).catch((error) => {
    console.log("Houve um erro no Servidor");
});
