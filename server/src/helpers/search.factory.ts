import { ILike, Like } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { SearchFilterOperator, SearchType } from '../types/enums';
import { SearchParams, SortFilter } from '../types/interfaces';
import { QueryParams } from '../types/interfaces';
import {
  RelationFilter,
  SearchFilter,
  SelectFilter,
} from '../types/interfaces';

const generateSelectFilter: Function = (
  filters: SelectFilter[]
): ObjectLiteral => {
  const selectQuery: ObjectLiteral = {};

  filters.forEach((filter: SelectFilter) => {
    selectQuery[filter.field] = true;
  });

  return selectQuery;
};

const generateSearchFilter: Function = (
  filters: SearchFilter[]
): ObjectLiteral => {
  const searchQuery: ObjectLiteral = {};

  filters.forEach((filter: SearchFilter) => {
    switch (filter.operator) {
      case SearchFilterOperator.EQUALITY:
        searchQuery[filter.field] = filter.value;
        break;

      case SearchFilterOperator.LIKE:
        searchQuery[filter.field] = Like(filter.value);
        break;

      case SearchFilterOperator.ILIKE:
        searchQuery[filter.field] = ILike(filter.value);
        break;

      default:
        searchQuery[filter.field] = filter.value;
        break;
    }
  });

  return searchQuery;
};

const generateSortFilter: Function = (
  relations: SortFilter[]
): ObjectLiteral => {
  const sortFilterQuery: ObjectLiteral = {};

  relations.forEach((relation: SortFilter) => {
    sortFilterQuery[relation.active] = relation.direction;
  });

  return sortFilterQuery;
};

const generateRelations: Function = (
  relations: RelationFilter[]
): ObjectLiteral => {
  const relationQuery: ObjectLiteral = {};

  relations.forEach((relations: RelationFilter) => {
    relationQuery[relations.field] = true;
  });

  return relationQuery;
};

export const generateQuery: Function = (params: SearchParams): QueryParams => {
  const {
    searchType,
    page,
    pageSize,
    sortFilter,
    relations,
    selected,
    filters,
  } = params;

  let query: QueryParams = {
    where: !!filters ? generateSearchFilter(filters) : {},
  };

  switch (searchType) {
    case SearchType.LIST:
      query = {
        ...query,
        select: !!selected ? generateSelectFilter(selected) : {},
        relations: !!relations ? generateRelations(relations) : {},
        order: !!sortFilter ? generateSortFilter(sortFilter) : {},
        skip: !!page && !!pageSize ? (page - 1) * pageSize : 0,
        take: pageSize,
      };
      break;

    case SearchType.SEARCH: //skip pagination
    case SearchType.RAW: //skip pagination
      query = {
        ...query,
        select: !!selected ? generateSelectFilter(selected) : {},
        relations: !!relations ? generateRelations(relations) : {},
        order: !!sortFilter ? generateSortFilter(sortFilter) : {},
      };
      break;

    default: //COUNT SearchType falls in default case, only where clause is required.
      break;
  }

  return query;
};
