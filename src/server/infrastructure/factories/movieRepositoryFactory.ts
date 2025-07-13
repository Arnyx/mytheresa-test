import { env } from '@/server/config/env';
import { TheMovieDbDatasourceImpl } from '../datasources/impl/TheMovieDbDatasourceImpl';
import { TmdbApiClient } from '../http/TmbdApiClient';
import { MovieRepositoryImpl } from '../repositories/MovieRepositoryImpl';

export const createMovieRepository = () => {
  const api = new TmdbApiClient(env.TMDB_BASE_URL, env.TMDB_ACCESS_TOKEN);
  const datasource = new TheMovieDbDatasourceImpl(api);
  return new MovieRepositoryImpl(datasource);
};
