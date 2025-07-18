import type { Movie } from '@/server/domain/models/Movie';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import type { GetMoviesOptions } from '@/server/domain/types/GetMoviesOptions';

export interface MoviesDatasource {
  getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getPopular(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getDetails(id: number): Promise<MovieDetails>;
}
