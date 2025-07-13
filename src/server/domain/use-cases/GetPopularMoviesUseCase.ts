import type { MovieRepository } from '../repositories/MovieRepository';
import type { Movie } from '../models/Movie';
import type { GetMoviesOptions } from '../types/GetMoviesOptions';

export class GetPopularMoviesUseCaseUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(options?: GetMoviesOptions): Promise<Movie[]> {
    return this.repository.getPopular(options);
  }
}
