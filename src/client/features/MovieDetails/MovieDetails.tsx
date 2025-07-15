import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetails } from './api/fetchMovieDetails';
import './movie-details.scss';

type MovieDetailsProps = {
  id: string;
};

export const MovieDetails = ({ id }: MovieDetailsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['movies', id],
    queryFn: () => fetchMovieDetails({ id }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <section className="movie-details">
      <div className="movie-details__image-wrapper">
        <img className="movie-details__image" src={data.imageUrl} alt={data.title} />
      </div>
      <div className="movie-details__info">
        <h1 className="movie-details__title">{data.title}</h1>
        <p className="movie-details__description">{data.description}</p>
        <div className="movie-details__actions">
          <button className="movie-details__button">Add to Wishlist</button>
        </div>
      </div>
    </section>
  );
};
