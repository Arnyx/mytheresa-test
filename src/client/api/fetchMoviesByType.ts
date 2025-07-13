import type { Movie } from '@/server/domain/models/Movie';
import type { MovieType } from '@shared/types/MovieType';

interface FetchMoviesParams {
  type: MovieType;
  page?: number;
}

export async function fetchMoviesByType({ type, page = 1 }: FetchMoviesParams): Promise<Movie[]> {
  const res = await fetch(`/api/movies/${type}?page=${page}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${type} movies`);
  }

  return res.json();
}
