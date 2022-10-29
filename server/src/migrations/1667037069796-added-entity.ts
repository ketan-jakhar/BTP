import { MigrationInterface, QueryRunner } from "typeorm";

export class addedEntity1667037069796 implements MigrationInterface {
    name = 'addedEntity1667037069796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "contact_number" bigint, "password" character varying, "last_login_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('ELECTRONICS', 'SPORTS', 'CLOTHING', 'ACCESSORIES', 'OTHERS')`);
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_id" uuid NOT NULL, "name" character varying, "price" integer NOT NULL, "category" "public"."products_category_enum" NOT NULL DEFAULT 'OTHERS', "description" text, "additional_remarks" text, "is_available" boolean, "sell_time" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carpool_details" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_id" uuid NOT NULL, "name" character varying, "estimated_price" integer NOT NULL, "additional_remarks" text, "departure_time" TIMESTAMP NOT NULL, "capacity" integer NOT NULL, "rider_count" integer NOT NULL, "drop_location" text NOT NULL, "pickup_location" text NOT NULL, "is_completed" boolean, CONSTRAINT "PK_c66f02ddbbe7bc5ca34950f8b3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carpool_companions" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8888f444134c841fcec78e72f44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a54421f7b6044ed7cf650d0aa6b" FOREIGN KEY ("publisher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carpool_details" ADD CONSTRAINT "FK_eab4087578cc099c11873c9b605" FOREIGN KEY ("publisher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carpool_details" DROP CONSTRAINT "FK_eab4087578cc099c11873c9b605"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a54421f7b6044ed7cf650d0aa6b"`);
        await queryRunner.query(`DROP TABLE "carpool_companions"`);
        await queryRunner.query(`DROP TABLE "carpool_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
        await queryRunner.query(`DROP INDEX "public"."email_index"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
