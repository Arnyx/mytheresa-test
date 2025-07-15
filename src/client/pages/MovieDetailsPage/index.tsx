import { MovieDetails } from '@/client/features/MovieDetails/MovieDetails';
import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <h1>Movie ID is required</h1>;
  }

  return <MovieDetails id={id} />;
};

export default MovieDetailsPage;
