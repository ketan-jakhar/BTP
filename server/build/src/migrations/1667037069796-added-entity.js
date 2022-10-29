"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addedEntity1667037069796 = void 0;
class addedEntity1667037069796 {
    constructor() {
        this.name = 'addedEntity1667037069796';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "email" character varying NOT NULL, "contact_number" bigint, "password" character varying, "last_login_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "email_index" ON "users" ("email") `);
            yield queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('ELECTRONICS', 'SPORTS', 'CLOTHING', 'ACCESSORIES', 'OTHERS')`);
            yield queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_id" uuid NOT NULL, "name" character varying, "price" integer NOT NULL, "category" "public"."products_category_enum" NOT NULL DEFAULT 'OTHERS', "description" text, "additional_remarks" text, "is_available" boolean, "sell_time" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "carpool_details" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_id" uuid NOT NULL, "name" character varying, "estimated_price" integer NOT NULL, "additional_remarks" text, "departure_time" TIMESTAMP NOT NULL, "capacity" integer NOT NULL, "rider_count" integer NOT NULL, "drop_location" text NOT NULL, "pickup_location" text NOT NULL, "is_completed" boolean, CONSTRAINT "PK_c66f02ddbbe7bc5ca34950f8b3c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "carpool_companions" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_8888f444134c841fcec78e72f44" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a54421f7b6044ed7cf650d0aa6b" FOREIGN KEY ("publisher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ADD CONSTRAINT "FK_eab4087578cc099c11873c9b605" FOREIGN KEY ("publisher_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "carpool_details" DROP CONSTRAINT "FK_eab4087578cc099c11873c9b605"`);
            yield queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a54421f7b6044ed7cf650d0aa6b"`);
            yield queryRunner.query(`DROP TABLE "carpool_companions"`);
            yield queryRunner.query(`DROP TABLE "carpool_details"`);
            yield queryRunner.query(`DROP TABLE "products"`);
            yield queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
            yield queryRunner.query(`DROP INDEX "public"."email_index"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.addedEntity1667037069796 = addedEntity1667037069796;
