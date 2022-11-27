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
exports.addedEntity1669369764807 = void 0;
class addedEntity1669369764807 {
    constructor() {
        this.name = 'addedEntity1669369764807';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "product_cart" ("usersId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_d7f24ce4f3ef10bf5ee8e9831a3" PRIMARY KEY ("usersId", "productsId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_6712037215bbf9ade0638eefdc" ON "product_cart" ("usersId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_5f2d0566abad474187e27a2780" ON "product_cart" ("productsId") `);
            yield queryRunner.query(`CREATE TABLE "carpool_companion_details" ("carpoolDetailsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_e8949cf5e63cecbe9d95032ac4b" PRIMARY KEY ("carpoolDetailsId", "usersId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_a3c5456c61ededaf6c6af5d08c" ON "carpool_companion_details" ("carpoolDetailsId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_3082b2ca5344c39a1c8a7e3d1d" ON "carpool_companion_details" ("usersId") `);
            yield queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_6712037215bbf9ade0638eefdcb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "product_cart" ADD CONSTRAINT "FK_5f2d0566abad474187e27a27803" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "carpool_companion_details" ADD CONSTRAINT "FK_a3c5456c61ededaf6c6af5d08c4" FOREIGN KEY ("carpoolDetailsId") REFERENCES "carpool_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "carpool_companion_details" ADD CONSTRAINT "FK_3082b2ca5344c39a1c8a7e3d1df" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "carpool_companion_details" DROP CONSTRAINT "FK_3082b2ca5344c39a1c8a7e3d1df"`);
            yield queryRunner.query(`ALTER TABLE "carpool_companion_details" DROP CONSTRAINT "FK_a3c5456c61ededaf6c6af5d08c4"`);
            yield queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_5f2d0566abad474187e27a27803"`);
            yield queryRunner.query(`ALTER TABLE "product_cart" DROP CONSTRAINT "FK_6712037215bbf9ade0638eefdcb"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_3082b2ca5344c39a1c8a7e3d1d"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_a3c5456c61ededaf6c6af5d08c"`);
            yield queryRunner.query(`DROP TABLE "carpool_companion_details"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_5f2d0566abad474187e27a2780"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_6712037215bbf9ade0638eefdc"`);
            yield queryRunner.query(`DROP TABLE "product_cart"`);
        });
    }
}
exports.addedEntity1669369764807 = addedEntity1669369764807;
