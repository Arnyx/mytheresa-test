import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from '../api/fetchMovieDetails';

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovieDetails({ id }),
  });
};
