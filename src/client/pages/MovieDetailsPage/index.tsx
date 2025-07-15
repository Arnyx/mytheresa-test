import { MovieDetails } from '@/client/features/MovieDetails/MovieDetails';
import { safeParseInt } from '@/server/presentation/helpers';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = safeParseInt(id);

  if (movieId <= 0) {
    return <h1>Invalid Movie ID</h1>;
  }

  return <MovieDetails id={movieId} />;
};

export default MovieDetailsPage;
