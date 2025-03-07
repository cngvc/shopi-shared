import {
  Field,
  QueryDslRangeQuery,
  SearchHit,
} from '@elastic/elasticsearch/lib/api/types';

export interface ISearchResult {
  hits: SearchHit[];
  total: number;
}

export interface IHitsTotal {
  value: number;
  relation: string;
}

export interface IQueryList {
  query_string?: IQueryString;
  range?: Partial<Record<Field, QueryDslRangeQuery>>;
  isPublished?: ITerm;
}

export interface IQueryString {
  fields: string[];
  query: string;
}

export interface ITerm {
  isPublished: boolean;
}

export interface IPaginateProps {
  from: string;
  size: number;
  type: string;
}
