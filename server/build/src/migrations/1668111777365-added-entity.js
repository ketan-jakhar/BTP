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
exports.addedEntity1668111777365 = void 0;
class addedEntity1668111777365 {
    constructor() {
        this.name = 'addedEntity1668111777365';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "recycle" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_57cf57949a58c13f3cd7612cb45" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "drop_location"`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "pickup_location"`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ADD "destination" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ADD "source" text NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "source"`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" DROP COLUMN "destination"`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ADD "pickup_location" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ADD "drop_location" text NOT NULL`);
            yield queryRunner.query(`DROP TABLE "recycle"`);
        });
    }
}
exports.addedEntity1668111777365 = addedEntity1668111777365;
