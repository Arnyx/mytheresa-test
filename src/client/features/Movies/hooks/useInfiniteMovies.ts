import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMoviesByType } from '@features/Movies/api/fetchMoviesByType';
import type { Movie } from '@/server/domain/models/Movie';
import type { MovieType } from '@shared/types/MovieType';

export function useInfiniteMovies(type: MovieType) {
  const [slides, setSlides] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['movies', type, page],
    queryFn: () => fetchMoviesByType({ type, page }),
  });

  const incrementPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!data?.length) return;

    setSlides((prev) => {
      const existingIds = new Set(prev.map((movie) => movie.id));
      const newUnique = data.filter((movie) => !existingIds.has(movie.id));
      return [...prev, ...newUnique];
    });
  }, [data]);

  return { slides, page, incrementPage };
}
