"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuery = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../types/enums");
const generateSelectFilter = (filters) => {
    const selectQuery = {};
    filters.forEach((filter) => {
        selectQuery[filter.field] = true;
    });
    return selectQuery;
};
const generateSearchFilter = (filters) => {
    const searchQuery = {};
    filters.forEach((filter) => {
        switch (filter.operator) {
            case enums_1.SearchFilterOperator.EQUALITY:
                searchQuery[filter.field] = filter.value;
                break;
            case enums_1.SearchFilterOperator.LIKE:
                searchQuery[filter.field] = (0, typeorm_1.Like)(filter.value);
                break;
            case enums_1.SearchFilterOperator.ILIKE:
                searchQuery[filter.field] = (0, typeorm_1.ILike)(filter.value);
                break;
            default:
                searchQuery[filter.field] = filter.value;
                break;
        }
    });
    return searchQuery;
};
const generateSortFilter = (relations) => {
    const sortFilterQuery = {};
    relations.forEach((relation) => {
        sortFilterQuery[relation.active] = relation.direction;
    });
    return sortFilterQuery;
};
const generateRelations = (relations) => {
    const relationQuery = {};
    relations.forEach((relations) => {
        relationQuery[relations.field] = true;
    });
    return relationQuery;
};
const generateQuery = (params) => {
    const { searchType, page, pageSize, sortFilter, relations, selected, filters, } = params;
    let query = {
        where: !!filters ? generateSearchFilter(filters) : {},
    };
    switch (searchType) {
        case enums_1.SearchType.LIST:
            query = Object.assign(Object.assign({}, query), { select: !!selected ? generateSelectFilter(selected) : {}, relations: !!relations ? generateRelations(relations) : {}, order: !!sortFilter ? generateSortFilter(sortFilter) : {}, skip: !!page && !!pageSize ? (page - 1) * pageSize : 0, take: pageSize });
            break;
        case enums_1.SearchType.SEARCH: //skip pagination
        case enums_1.SearchType.RAW: //skip pagination
            query = Object.assign(Object.assign({}, query), { select: !!selected ? generateSelectFilter(selected) : {}, relations: !!relations ? generateRelations(relations) : {}, order: !!sortFilter ? generateSortFilter(sortFilter) : {} });
            break;
        default: //COUNT SearchType falls in default case, only where clause is required.
            break;
    }
    return query;
};
exports.generateQuery = generateQuery;
