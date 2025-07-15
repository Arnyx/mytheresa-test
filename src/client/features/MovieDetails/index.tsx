import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  return <h1>Detalles de la película con ID: {id}</h1>;
};
