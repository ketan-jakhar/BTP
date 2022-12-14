import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1670923245280 implements MigrationInterface {
    name = 'addedEntity1670923245280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "publisher_rider_count" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "publisher_rider_count"`);
    }

}
