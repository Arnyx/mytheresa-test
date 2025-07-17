import MovieDetails from '@/client/features/MovieDetails/MovieDetails';
import type { MovieType } from '@/client/shared/types/MovieType';
import { safeParseInt } from '@/server/presentation/helpers';
import { useParams, useSearchParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = safeParseInt(id);
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as MovieType;

  if (movieId <= 0) {
    return <h1>Invalid Movie ID</h1>;
  }

  return <MovieDetails id={movieId} type={type} />;
};

export default MovieDetailsPage;
