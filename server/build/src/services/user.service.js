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
exports.findUserByContactNumber = exports.findUserById = exports.findUserByEmail = exports.createUser = exports.UserService = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const entities_1 = require("../types/entities");
/**
 * User Pagination Service
 */
class UserService extends _1.AbstractPaginationService {
    getRepository() {
        return utils_1.AppDataSource.getRepository(entities_1.User);
    }
}
exports.UserService = UserService;
const userRepository = utils_1.AppDataSource.getRepository(entities_1.User);
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Carpool input', input);
    return (yield utils_1.AppDataSource.manager.save(utils_1.AppDataSource.manager.create(entities_1.User, input)));
});
exports.createUser = createUser;
const findUserByEmail = ({ email, }) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.findOneBy({ email }); });
exports.findUserByEmail = findUserByEmail;
const findUserById = ({ id, }) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.findOneBy({ id }); });
exports.findUserById = findUserById;
const findUserByContactNumber = ({ contact_number, }) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.findOneBy({ contact_number }); });
exports.findUserByContactNumber = findUserByContactNumber;
