import type { Movie } from '../models/Movie';

export interface MovieRepository {
  getMovies(): Promise<Array<Movie>>;
}
