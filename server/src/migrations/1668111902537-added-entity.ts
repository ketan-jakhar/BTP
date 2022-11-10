import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1668111902537 implements MigrationInterface {
    name = 'addedEntity1668111902537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_available" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ALTER COLUMN "is_completed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" ALTER COLUMN "is_completed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_available" DROP DEFAULT`);
    }

}
