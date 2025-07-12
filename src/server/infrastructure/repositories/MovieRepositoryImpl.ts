import type { MovieRepository } from '@/server/domain/repositories/MovieRepository';
import type { TheMovieDbDatasource } from '../datasources/TheMovieDbDatasource';
import type { Movie } from '@/server/domain/models/Movie';

export class MovieRepositoryImpl implements MovieRepository {
  private readonly datasource: TheMovieDbDatasource;

  constructor(datasource: TheMovieDbDatasource) {
    this.datasource = datasource;
  }

  async getMovies(): Promise<Array<Movie>> {
    return this.datasource.getMovies();
  }
}
