import "reflect-metadata";
import { DataSource } from "typeorm";
import cliente from "../model/cliente.js";

const AppDataSource = new DataSource({
    type: "mysql", //colocar mysql 
    host: "localhost",
    username: "root",
    password: "", //trocar a senha dependo da maquina
    port: "3306",
    database: "barbearia",
    entities: [cliente],
    migrations: ["src/database/migrations"]
});

export { AppDataSource };