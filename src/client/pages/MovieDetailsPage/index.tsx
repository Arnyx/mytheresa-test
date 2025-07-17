import MovieDetails from '@features/MovieDetails/MovieDetails';
import type { MovieType } from '@shared/types/MovieType';
import { safeParseInt } from '@/server/presentation/helpers';
import { useParams, useSearchParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const movieId = safeParseInt(id);
  const type = searchParams.get('type') as MovieType;

  if (!movieId || movieId <= 0) {
    return <>Invalid Movie ID</>;
  }

  return <MovieDetails id={movieId} type={type} />;
};

export default MovieDetailsPage;
