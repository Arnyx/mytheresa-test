import type { MovieRepository } from '@/server/domain/repositories/MovieRepository';
import type { MoviesDatasource } from '../datasources/MoviesDatasource';
import type { Movie } from '@/server/domain/models/Movie';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';

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

  async getDetails(id: number): Promise<MovieDetails> {
    return this.datasource.getDetails(id);
  }
}
