import type { Movie } from '@/server/domain/models/Movie';

export interface TheMovieDbDatasource {
  getMovies(): Promise<Array<Movie>>;
}
