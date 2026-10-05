import "reflect-metadata";
import { DataSource } from "typeorm";
import cliente from "../model/cliente.js";

const AppDataSource = new DataSource({
    type: "mariadb", //colocar mysql 
    host: "localhost",
    username: "root",
    password: "2214", //trocar a senha dependo da maquina
    port: "3306",
    database: "barbearia",
    entities: [cliente],
    migrations: ["src/database/migrations"]
});

export { AppDataSource };