import type { MovieRepository } from '../repositories/MovieRepository';
import type { Movie } from '../models/Movie';
import type { GetMoviesOptions } from '../types/GetMoviesOptions';

export class GetNowPlayingMoviesUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(options?: GetMoviesOptions): Promise<Movie[]> {
    return this.repository.getNowPlaying(options);
  }
}
