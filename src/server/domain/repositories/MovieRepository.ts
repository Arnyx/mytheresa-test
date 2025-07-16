import type { Movie } from '../models/Movie';
import type { MovieDetails } from '../models/MovieDetails';
import type { GetMoviesOptions } from '../types/GetMoviesOptions';

export interface MovieRepository {
  getNowPlaying(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getPopular(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getTopRated(options?: GetMoviesOptions): Promise<Array<Movie>>;
  getDetails(id: number): Promise<MovieDetails>;
}
