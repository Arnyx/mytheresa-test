import type { Movie } from '@/server/domain/models/Movie';
import type { TheMovieDbDatasource } from '../TheMovieDbDatasource';
import type { TmdbApiClient } from '../../http/TmbdApiClient';
import type { TheMovieDbCategoryResponse } from '../../dtos/TheMovieDbCategoryResponse';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';
import { MovieMapper } from '../../mappers/TheMovieDbMoviesMapper';

export class TheMovieDbDatasourceImpl implements TheMovieDbDatasource {
  private readonly api: TmdbApiClient;

  constructor(api: TmdbApiClient) {
    this.api = api;
  }

  async getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.api.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/now_playing`, options);
    return MovieMapper.fromDtoList(res.results);
  }

  async getPopular(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.api.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/popular`, options);
    return MovieMapper.fromDtoList(res.results);
  }

  async getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.api.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/top_rated`, options);
    return MovieMapper.fromDtoList(res.results);
  }
}
