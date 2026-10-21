import { EntitySchema } from "typeorm";

const admin = new EntitySchema({
    tableName: "admin",
    name: "admin",
    columns: {
        id_admin: {primary: true, generated: "increment", type: "int"},
        name: {type: "varchar", length: 80, nullable: false},
        email: {type: "varchar", length: 150, nullable: false, unique: true},
        password: {type: "varchar", length: 60, nullable: false},
        telefone: {type: "varchar", length: 15,  nullable: false}
    }
});

export default admin;