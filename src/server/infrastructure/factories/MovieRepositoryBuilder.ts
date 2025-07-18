import { MovieRepositoryImpl } from '@/server/infrastructure/repositories/MovieRepositoryImpl';
import { LocalDatasource } from '@/server/infrastructure/datasources/impl/LocalDatasource';
import { TheMovieDbDatasourceImpl } from '@/server/infrastructure/datasources/impl/TheMovieDbDatasourceImpl';
import { HttpClient } from '@/server/infrastructure/http/HttpClient';
import { env } from '@/server/config/env';
import type { MoviesDatasource } from '../datasources/MoviesDatasource';

export class MovieRepositoryBuilder {
  private datasource: MoviesDatasource | null = null;

  static create(): MovieRepositoryBuilder {
    return new MovieRepositoryBuilder();
  }

  withLocalDatasource(): MovieRepositoryBuilder {
    this.datasource = new LocalDatasource();
    return this;
  }

  withTheMovieDbDatasource(): MovieRepositoryBuilder {
    const api = new HttpClient(env.TMDB_BASE_URL, env.TMDB_ACCESS_TOKEN);
    this.datasource = new TheMovieDbDatasourceImpl(api);
    return this;
  }

  withCustomDatasource(datasource: MoviesDatasource): MovieRepositoryBuilder {
    this.datasource = datasource;
    return this;
  }

  build(): MovieRepositoryImpl {
    if (!this.datasource) {
      throw new Error('Datasource not configured.');
    }
    return new MovieRepositoryImpl(this.datasource);
  }
}
