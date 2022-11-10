import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1668111777365 implements MigrationInterface {
    name = 'addedEntity1668111777365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recycle" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_57cf57949a58c13f3cd7612cb45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "drop_location"`);
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "pickup_location"`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "destination" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "source" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "source"`);
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "destination"`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "pickup_location" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD "drop_location" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "recycle"`);
    }

}
