import type { MovieRepository } from '../repositories/MovieRepository';
import type { Movie } from '../models/Movie';

export class GetMovies {
  private repository: MovieRepository;

  constructor(repository: MovieRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Movie[]> {
    return this.repository.getMovies();
  }
}
