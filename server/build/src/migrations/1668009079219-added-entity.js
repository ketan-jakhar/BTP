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
exports.addedEntity1668009079219 = void 0;
class addedEntity1668009079219 {
    constructor() {
        this.name = 'addedEntity1668009079219';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'super_admin')`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "changePasswordToken" character varying`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "changePasswordToken"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
            yield queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        });
    }
}
exports.addedEntity1668009079219 = addedEntity1668009079219;
