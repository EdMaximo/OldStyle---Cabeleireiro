import { DefaultNamingStrategy, EntitySchema } from "typeorm";

// Juntei a tabela corte e preço numa só, para diminuir a quantidade de tabelas.
const corte = new EntitySchema({
    tableName: "corte",
    name: "corte",
    columns: {
        id_corte: {primary: true, generated: "increment", type: "int"},
        nome: {type: "varchar", length: 80, nullable: false},
        descricao: {type: "varchar", length: 255, nullable: false},
        preco: {type: "decimal", precision: 10, scale: 2, nullable: false}
    }
});

export default corte;