/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1792090203083 {
    name = 'Db1792090203083'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id_cliente\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(80) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(20) NOT NULL, \`telefone\` varchar(11) NOT NULL, UNIQUE INDEX \`IDX_503f81286c5e49acd6a832abf4\` (\`email\`), PRIMARY KEY (\`id_cliente\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`corte\` (\`id_corte\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(80) NOT NULL, \`descricao\` varchar(255) NOT NULL, \`preco\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id_corte\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cabelereiro\` (\`id_cabelereiro\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(80) NOT NULL, \`especializacao\` varchar(200) NOT NULL, PRIMARY KEY (\`id_cabelereiro\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agendamento\` (\`id_agendamento\` int NOT NULL AUTO_INCREMENT, \`data_hora\` datetime NOT NULL, \`id_cliente\` int NULL, \`id_cabelereiro\` int NULL, \`id_corte\` int NULL, PRIMARY KEY (\`id_agendamento\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`agendamento\` ADD CONSTRAINT \`FK_9a6b2bf139bd2d5992537880615\` FOREIGN KEY (\`id_cliente\`) REFERENCES \`cliente\`(\`id_cliente\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendamento\` ADD CONSTRAINT \`FK_319f6ea607eabc42e88c2ca9b76\` FOREIGN KEY (\`id_cabelereiro\`) REFERENCES \`cabelereiro\`(\`id_cabelereiro\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendamento\` ADD CONSTRAINT \`FK_bf6b881a49655cdb92dc8e9ff66\` FOREIGN KEY (\`id_corte\`) REFERENCES \`corte\`(\`id_corte\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        
        // NÃO MECHER
        await queryRunner.query(`
            INSERT INTO \`corte\` (nome, descricao, preco) VALUES 
            ('FADE PRECISO', 'Degradê, textura e acabamento', 75.00),
            ('CLÁSSICO ATUAL', 'Tesoura, contorno e finalização', 85.00),
            ('CRESPO NATURAL', 'Forma, definição e acabamento', 90.00)
        `);

        await queryRunner.query(`
            INSERT INTO \`cabelereiro\` (nome, especializacao) VALUES 
            ('RAFAEL NUNES', 'Fade, barba e acabamento preciso'),
            ('CAIO MARTINS', 'Tesoura, textura e cortes clássicos')
        `);
        // ACIMA NÃO MEXER
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`agendamento\` DROP FOREIGN KEY \`FK_bf6b881a49655cdb92dc8e9ff66\``);
        await queryRunner.query(`ALTER TABLE \`agendamento\` DROP FOREIGN KEY \`FK_319f6ea607eabc42e88c2ca9b76\``);
        await queryRunner.query(`ALTER TABLE \`agendamento\` DROP FOREIGN KEY \`FK_9a6b2bf139bd2d5992537880615\``);
        await queryRunner.query(`DROP TABLE \`agendamento\``);
        await queryRunner.query(`DROP TABLE \`cabelereiro\``);
        await queryRunner.query(`DROP TABLE \`corte\``);
        await queryRunner.query(`DROP INDEX \`IDX_503f81286c5e49acd6a832abf4\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
    }
}
