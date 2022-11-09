import { SearchType } from '../enums';
import { RelationFilter, SearchFilter, SelectFilter, SortFilter } from '.';

// params from frontend
export interface SearchParams {
  searchType?: SearchType;
  page?: number | undefined;
  pageSize?: number;

  sortFilter?: SortFilter[]; // maps to order in database query
  relations?: RelationFilter[]; // maps to relations in database query
  selected?: SelectFilter[]; // maps to select in database query
  filters?: SearchFilter[]; // maps to where in database query
}
