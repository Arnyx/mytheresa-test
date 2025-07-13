import type { MovieRepository } from '@/server/domain/repositories/MovieRepository';
import type { TheMovieDbDatasource } from '../datasources/TheMovieDbDatasource';
import type { Movie } from '@/server/domain/models/Movie';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';

export class MovieRepositoryImpl implements MovieRepository {
  private readonly datasource: TheMovieDbDatasource;

  constructor(datasource: TheMovieDbDatasource) {
    this.datasource = datasource;
  }

  async getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>> {
    return this.datasource.getNowPlaying(options);
  }

  async getPopular(options?: GetMoviesOptions): Promise<Array<Movie>> {
    return this.datasource.getPopular(options);
  }

  async getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>> {
    return this.datasource.getTopRated(options);
  }
}
