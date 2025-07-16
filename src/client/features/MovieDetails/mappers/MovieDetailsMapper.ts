import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import type { WishlistMovie } from '@shared/types/WishListMove';

export class MovieDetailsMapper {
  static toWishlist(movie: MovieDetails): WishlistMovie {
    return {
      id: movie.id,
      title: movie.title,
      imageUrl: movie.imageUrl,
    };
  }
}
