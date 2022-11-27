import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1669369764807 implements MigrationInterface {
    name = 'addedEntity1669369764807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_cart" ("usersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_d7f24ce4f3ef10bf5ee8e9831a3" PRIMARY KEY ("usersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6712037215bbf9ade0638eefdc" ON "product_cart" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f2d0566abad474187e27a2780" ON "product_cart" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "carpool_companion_details" ("carpoolDetailsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_e8949cf5e63cecbe9d95032ac4b" PRIMARY KEY ("carpoolDetailsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3c5456c61ededaf6c6af5d08c" ON "carpool_companion_details" ("carpoolDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3082b2ca5344c39a1c8a7e3d1d" ON "carpool_companion_details" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_6712037215bbf9ade0638eefdcb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_5f2d0566abad474187e27a27803" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carpool_companion_details" ADD CONSTRAINT "FK_a3c5456c61ededaf6c6af5d08c4" FOREIGN KEY ("carpoolDetailsId") REFERENCES "carpool_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carpool_companion_details" ADD CONSTRAINT "FK_3082b2ca5344c39a1c8a7e3d1df" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_companion_details" DROP CONSTRAINT "FK_3082b2ca5344c39a1c8a7e3d1df"`);
        await queryRunner.query(`ALTER TABLE "carpool_companion_details" DROP CONSTRAINT "FK_a3c5456c61ededaf6c6af5d08c4"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_5f2d0566abad474187e27a27803"`);
        await queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_6712037215bbf9ade0638eefdcb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3082b2ca5344c39a1c8a7e3d1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3c5456c61ededaf6c6af5d08c"`);
        await queryRunner.query(`DROP TABLE "carpool_companion_details"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f2d0566abad474187e27a2780"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6712037215bbf9ade0638eefdc"`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
    }

}
