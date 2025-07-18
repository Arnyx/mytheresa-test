import { MovieRepositoryBuilder } from './MovieRepositoryBuilder';
import { env } from '@/server/config/env';
import type { MovieRepositoryImpl } from '@/server/infrastructure/repositories/MovieRepositoryImpl';

const strategies: Record<string, () => MovieRepositoryImpl> = {
  TMDB: () => MovieRepositoryBuilder.create().withTheMovieDbDatasource().build(),
  LOCAL: () => MovieRepositoryBuilder.create().withLocalDatasource().build(),
};

export const createMovieRepository = (): MovieRepositoryImpl => {
  const type = env.DATASOURCE?.toUpperCase() || 'LOCAL';
  const strategy = strategies[type] ?? strategies.LOCAL;
  return strategy();
};
