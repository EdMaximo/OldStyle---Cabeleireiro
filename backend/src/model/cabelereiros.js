import { EntitySchema } from "typeorm";

const cabelereiros = new EntitySchema({
    tableName: "cabelereiro",
    name: "cabelereiro",
    columns:{
        id_cabelereiro: {primary: true, generated: "increment", type: "int"},
        nome: {type: "varchar", length: 80, nullable: false},
        especializacao: {type: "varchar", length: 200, nullable: false}
    }
});

export default cabelereiros;