import type { MovieDetails } from '@/server/domain/models/MovieDetails';

interface FetchMovieDetailsParams {
  id?: string;
}

export async function fetchMovieDetails({ id }: FetchMovieDetailsParams): Promise<MovieDetails> {
  const res = await fetch(`/api/movie/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch movie with ID: ${id}`);
  }

  return res.json();
}
