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
exports.addedEntity1668111902537 = void 0;
class addedEntity1668111902537 {
    constructor() {
        this.name = 'addedEntity1668111902537';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_available" SET DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "carpool_details" ALTER COLUMN "is_completed" SET DEFAULT false`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "carpool_details" ALTER COLUMN "is_completed" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "is_available" DROP DEFAULT`);
        });
    }
}
exports.addedEntity1668111902537 = addedEntity1668111902537;
