import { useParams } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Details Page {id}</h1>
    </div>
  );
};

export default MovieDetailsPage;
