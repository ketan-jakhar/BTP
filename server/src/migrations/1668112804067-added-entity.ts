import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1668112804067 implements MigrationInterface {
    name = 'addedEntity1668112804067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
