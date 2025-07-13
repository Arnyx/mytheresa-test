import type { Movie } from '@/server/domain/models/Movie';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';

export interface TheMovieDbDatasource {
  getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getPopular(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>>;
}
