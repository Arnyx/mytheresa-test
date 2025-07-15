import type { MovieDetails } from '../models/MovieDetails';
import type { MovieRepository } from '../repositories/MovieRepository';

export class GetMovieDetailsUseCase {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<MovieDetails> {
    return this.repository.getDetails(id);
  }
}
