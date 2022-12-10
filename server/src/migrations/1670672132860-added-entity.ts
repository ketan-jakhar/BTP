import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1670672132860 implements MigrationInterface {
    name = 'addedEntity1670672132860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "changePasswordToken" TO "change_password_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "change_password_token" TO "changePasswordToken"`);
    }

}
