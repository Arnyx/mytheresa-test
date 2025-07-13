import type { TheMovieDbMovie } from './TheMovieDbMovie';

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface TheMovieDbCategoryResponse {
  dates?: Dates;
  page: number;
  results: Array<TheMovieDbMovie>;
  total_pages: number;
  total_results: number;
}
