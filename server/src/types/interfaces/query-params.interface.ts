// params for database query
export interface QueryParams {
  select?: Object;
  relations?: Object;
  where?: Object;
  order?: Object;
  skip?: number;
  take?: number;
}
