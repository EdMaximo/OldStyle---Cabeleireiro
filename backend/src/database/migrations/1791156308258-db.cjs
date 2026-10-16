/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1791156308258 {
    name = 'Db1791156308258'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(80) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(20) NOT NULL, \`telefone\` varchar(11) NOT NULL, UNIQUE INDEX \`IDX_503f81286c5e49acd6a832abf4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_503f81286c5e49acd6a832abf4\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
    }
}
