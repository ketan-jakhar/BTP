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
exports.findCarpoolById = exports.createCarpool = exports.CarpoolService = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const entities_1 = require("../types/entities");
/**
 * Carpool Pagination Service
 */
class CarpoolService extends _1.AbstractPaginationService {
    getRepository() {
        return utils_1.AppDataSource.getRepository(entities_1.Carpool);
    }
}
exports.CarpoolService = CarpoolService;
const carpoolRepository = utils_1.AppDataSource.getRepository(entities_1.Carpool);
//use moment.js to set date
const createCarpool = (input) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Carpool input', input);
    return (yield utils_1.AppDataSource.manager.save(utils_1.AppDataSource.manager.create(entities_1.Carpool, input)));
});
exports.createCarpool = createCarpool;
const findCarpoolById = ({ id, }) => __awaiter(void 0, void 0, void 0, function* () { return yield carpoolRepository.findOneBy({ id }); });
exports.findCarpoolById = findCarpoolById;
