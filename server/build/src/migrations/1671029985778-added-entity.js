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
exports.addedEntity1671029985778 = void 0;
class addedEntity1671029985778 {
    constructor() {
        this.name = 'addedEntity1671029985778';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "recycle" ADD "img_url" text`);
            yield queryRunner.query(`ALTER TABLE "products" ADD "img_url" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
            yield queryRunner.query(`ALTER TABLE "recycle" DROP COLUMN "img_url"`);
        });
    }
}
exports.addedEntity1671029985778 = addedEntity1671029985778;
