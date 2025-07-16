import { useWishlist } from '@/client/shared/hooks/useWishlist';
import { useMovieDetails } from './hooks/useMovieDetails';
import './movie-details.scss';

type MovieDetailsProps = {
  id: number;
};

export const MovieDetails = ({ id }: MovieDetailsProps) => {
  const { data, isLoading } = useMovieDetails(id);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(id);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <section className="movie-details">
      <div className="movie-details__image-wrapper">
        <img className="movie-details__image" src={data.backdropPath} alt={data.title} />
      </div>
      <div className="movie-details__info">
        <h1 className="movie-details__title">{data.title}</h1>
        <p className="movie-details__description">{data.description}</p>
        <div className="movie-details__actions">
          <button
            className={`movie-details__button ${wishlisted ? 'is-active' : ''}`}
            onClick={() => toggleWishlist(data)}
          >
            {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </section>
  );
};
