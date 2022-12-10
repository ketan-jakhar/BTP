import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1670671372333 implements MigrationInterface {
    name = 'addedEntity1670671372333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "contact_number" bigint NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "password" character varying, "changePasswordToken" character varying, "last_login_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_463c7b876dd0e8d3803c72af152" UNIQUE ("contact_number"), CONSTRAINT "UQ_463c7b876dd0e8d3803c72af152" UNIQUE ("contact_number"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "category" "public"."products_category_enum" NOT NULL DEFAULT 'OTHERS', "description" text, "additional_remarks" text, "is_available" boolean DEFAULT true, "sell_time" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carpool_details" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_id" uuid NOT NULL, "name" character varying, "estimated_price" integer NOT NULL, "additional_remarks" text, "departure_time" TIMESTAMP NOT NULL, "capacity" integer NOT NULL, "rider_count" integer NOT NULL, "destination" text NOT NULL, "source" text NOT NULL, "is_completed" boolean DEFAULT false, CONSTRAINT "PK_c66f02ddbbe7bc5ca34950f8b3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recycle_category_enum" AS ENUM('NON_BIODEGRADABLE', 'BIODEGRADABLE')`);
        await queryRunner.query(`CREATE TABLE "recycle" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "name" character varying NOT NULL, "category" "public"."recycle_category_enum" NOT NULL, "remarks" text, "is_pickedup" boolean DEFAULT true, "recycle_pickup_time" TIMESTAMP, CONSTRAINT "PK_57cf57949a58c13f3cd7612cb45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_cart" ("usersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_d7f24ce4f3ef10bf5ee8e9831a3" PRIMARY KEY ("usersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6712037215bbf9ade0638eefdc" ON "product_cart" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f2d0566abad474187e27a2780" ON "product_cart" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "carpool_companion_details" ("carpoolDetailsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_e8949cf5e63cecbe9d95032ac4b" PRIMARY KEY ("carpoolDetailsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3c5456c61ededaf6c6af5d08c" ON "carpool_companion_details" ("carpoolDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3082b2ca5344c39a1c8a7e3d1d" ON "carpool_companion_details" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD CONSTRAINT "FK_eab4087578cc099c11873c9b605" FOREIGN KEY ("publisher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recycle" ADD CONSTRAINT "FK_f763fbaa3c642183da6f792d6a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "recycle" DROP CONSTRAINT "FK_f763fbaa3c642183da6f792d6a1"`);
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP CONSTRAINT "FK_eab4087578cc099c11873c9b605"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3082b2ca5344c39a1c8a7e3d1d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3c5456c61ededaf6c6af5d08c"`);
        await queryRunner.query(`DROP TABLE "carpool_companion_details"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f2d0566abad474187e27a2780"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6712037215bbf9ade0638eefdc"`);
        await queryRunner.query(`DROP TABLE "product_cart"`);
        await queryRunner.query(`DROP TABLE "recycle"`);
        await queryRunner.query(`DROP TYPE "public"."recycle_category_enum"`);
        await queryRunner.query(`DROP TABLE "carpool_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
