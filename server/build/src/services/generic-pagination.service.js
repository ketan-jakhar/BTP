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
exports.AbstractPaginationService = void 0;
const helpers_1 = require("../helpers");
/**
 * Generic Pagination Service
 */
class AbstractPaginationService {
    constructor() {
        this.countResources = (params) => __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const queryParams = (0, helpers_1.generateQuery)(params);
            return yield repository.count(queryParams);
        });
    }
    upsertResource(payload, conflictPathsArray) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            console.log('payload (abstract-pagination-service.ts -> upsertResource):- \n', payload);
            const data = yield repository.upsert(payload, {
                conflictPaths: conflictPathsArray,
                skipUpdateIfNoValuesChanged: true,
            });
            console.log('upsertdata: ', data);
            return data;
        });
    }
    createResource(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            console.log('payload (abstract-pagination-service.ts -> createResource):- \n', payload);
            return yield repository.insert(payload);
        });
    }
    listResources(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const queryParams = (0, helpers_1.generateQuery)(params);
            return yield repository.find(queryParams);
        });
    }
    updateResource(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return yield repository.update(id, payload);
        });
    }
    deleteResource(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            return yield repository.delete(id);
        });
    }
}
exports.AbstractPaginationService = AbstractPaginationService;
