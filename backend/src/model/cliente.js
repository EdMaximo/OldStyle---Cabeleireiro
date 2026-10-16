import { EntitySchema } from "typeorm";

const cliente = new EntitySchema({
    tableName: "cliente",
    name: "cliente",
    columns: {
        id: {primary: true, generated: "increment", type: "int"},
        name: {type: "varchar", length: 80, nullable: false},
        email: {type: "varchar", length: 150, nullable: false, unique: true},
        password: {type: "varchar", length: 20, nullable: false},
        telefone: {type: "varchar", length: 11,  nullable: false}
    }
});

export default cliente;