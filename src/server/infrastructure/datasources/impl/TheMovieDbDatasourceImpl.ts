import type { Movie } from '@/server/domain/models/Movie';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';
import type { TheMovieDbCategoryResponse } from '../../dtos/TheMovieDbCategoryResponse';
import type { HttpClient } from '../../http/HttpClient';
import { TheMovieDbMoviesMapper } from '../../mappers/TheMovieDbMoviesMapper';
import type { MoviesDatasource } from '../MoviesDatasource';
import { TheMovieDbMovieDetailsMapper } from '../../mappers/TheMovieDbMovieDetailsMapper';
import type { TheMovieDbDetails } from '../../dtos/TheMovieDbDetails';

export class TheMovieDbDatasourceImpl implements MoviesDatasource {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.http.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/now_playing`, options);
    return TheMovieDbMoviesMapper.fromDtoList(res.results);
  }

  async getPopular(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.http.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/popular`, options);
    return TheMovieDbMoviesMapper.fromDtoList(res.results);
  }

  async getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>> {
    const res = await this.http.get<TheMovieDbCategoryResponse, GetMoviesOptions>(`/movie/top_rated`, options);
    return TheMovieDbMoviesMapper.fromDtoList(res.results);
  }

  async getDetails(id: number): Promise<MovieDetails> {
    const res = await this.http.get<TheMovieDbDetails, { id: number }>(`/movie/${id}`);
    return TheMovieDbMovieDetailsMapper.toDomain(res);
  }
}
