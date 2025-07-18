import type { Movie } from '@/server/domain/models/Movie';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import movieJson from '@/test-utils/mocks/handlers/movie/movie-tmdb.json';
import moviesJson from '@/test-utils/mocks/handlers/movies/movies-tmdb.json';
import { TheMovieDbMovieDetailsMapper } from '../../mappers/TheMovieDbMovieDetailsMapper';
import { TheMovieDbMoviesMapper } from '../../mappers/TheMovieDbMoviesMapper';
import type { MoviesDatasource } from '../MoviesDatasource';

export class LocalDatasource implements MoviesDatasource {
  private assignRandomIds<T extends { id: number }>(movies: T[]): T[] {
    return movies.map((movie) => ({
      ...movie,
      id: Math.floor(Math.random() * 1000000),
    }));
  }

  private async loadMockMovies(): Promise<Array<Movie>> {
    const res = await Promise.resolve(moviesJson);
    const moviesWithRandomIds = this.assignRandomIds(res.results);
    console.log(moviesWithRandomIds);
    return TheMovieDbMoviesMapper.fromDtoList(moviesWithRandomIds);
  }

  async getNowPlaying(): Promise<Array<Movie>> {
    return this.loadMockMovies();
  }

  async getPopular(): Promise<Array<Movie>> {
    return this.loadMockMovies();
  }

  async getTopRated(): Promise<Array<Movie>> {
    return this.loadMockMovies();
  }

  async getDetails(): Promise<MovieDetails> {
    const res = await Promise.resolve(movieJson);
    return TheMovieDbMovieDetailsMapper.toDomain(res);
  }
}
