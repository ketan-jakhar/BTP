import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1670879334374 implements MigrationInterface {
    name = 'addedEntity1670879334374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "mapping" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "mapping"`);
    }

}
