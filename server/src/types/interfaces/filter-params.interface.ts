import { SearchFilterOperator } from '../enums';
import { SortDirection } from '.';

export interface RelationFilter {
  field: string;
}

export interface SelectFilter {
  field: string;
}

export interface SortFilter {
  active: string;
  /** The sort direction. */
  direction: SortDirection;
}

export interface SearchFilter {
  //TODO: See how to implement operators
  operator?: SearchFilterOperator;
  field: string;
  value: any;
}
