import { EntitySchema, JoinColumn } from "typeorm";

//Essa tabela vai ser o centro vai relacionar clientes, cortes e cabelereiros

const agendamento = new EntitySchema({
    tableName: "agendamento",
    name: "agendamento",
    columns:  {
        id_agendamento: {primary: true, generated: "increment", type: "int"},
        data_hora: {type: "datetime", nullable: false},
        status: { // Eduardo - Coloquei o status para a administração
            type: "enum",
            enum: ["pendente", "aceito", "recusado"],
            default: "pendente",
            nullable: false
        }
    },
    relations: { //Relacionamento entre as outras tabelas
        cliente: {
            target: "cliente", // define nosso "alvo"
            type: "many-to-one", //Tipo do relacionamento, aqui sendo varios para 1 1:N
            joinColumn: {name: "id_cliente"},
        },
        cabelereiro: {
            target: "cabelereiro",
            type: "many-to-one",
            joinColumn: {name: "id_cabelereiro"}
        },
        corte: {
            target: "corte",
            type: "many-to-one",
            joinColumn: {name: "id_corte"}
        }
    }
});

export default agendamento;