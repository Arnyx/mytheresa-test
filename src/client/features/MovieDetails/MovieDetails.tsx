import { useWishlist } from '@/client/shared/hooks/useWishlist';
import { useMovieDetails } from './hooks/useMovieDetails';
import './movie-details.scss';
import type { MovieType } from '@/client/shared/types/MovieType';
import { useState } from 'react';

type MovieDetailsProps = {
  id: number;
  type?: MovieType;
};

const MovieDetails = ({ id, type }: MovieDetailsProps) => {
  const { data } = useMovieDetails(id);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(id);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!data) return null;

  const typeModifier = type ? `movie-details--${type}` : '';
  const imageLoadedModifier = imageLoaded ? `movie-details__image--loaded` : '';

  return (
    <section className={`movie-details ${typeModifier}`}>
      <div className="movie-details__image-wrapper">
        <img
          className={`movie-details__image ${imageLoadedModifier}`}
          src={data.backdropPath}
          alt={data.title}
          onLoad={() => setImageLoaded(true)}
        />
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

export default MovieDetails;
