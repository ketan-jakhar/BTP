import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1671029985778 implements MigrationInterface {
    name = 'addedEntity1671029985778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recycle" ADD "img_url" text`);
        await queryRunner.query(`ALTER TABLE "products" ADD "img_url" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
        await queryRunner.query(`ALTER TABLE "recycle" DROP COLUMN "img_url"`);
    }

}
