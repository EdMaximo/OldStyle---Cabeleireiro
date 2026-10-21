import "reflect-metadata";
import { DataSource } from "typeorm";
import cliente from "../model/cliente.js";
import corte from "../model/cortes.js";
import cabelereiros from "../model/cabelereiros.js";
import agendamento from "../model/agendamento.js";
import admin from "../model/admin.js";

const AppDataSource = new DataSource({
    type: "mysql", //colocar mysql 
    host: "localhost",
    username: "root",
    password: "", //trocar a senha dependo da maquina
    port: "3306",
    database: "barbearia",
    entities: [cliente, corte, cabelereiros, agendamento, admin],
    migrations: ["src/database/migrations"]
});

export { AppDataSource };