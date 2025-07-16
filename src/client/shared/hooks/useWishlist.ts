import { useEffect, useState } from 'react';
import LocalStorageService from '@shared/services/LocalStorageService';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import type { WishlistMovie } from '../types/WishListMove';
import { MovieDetailsMapper } from '@/client/features/MovieDetails/mappers/MovieDetailsMapper';

const WISHLIST_KEY = 'mytheresa-test:wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Map<number, WishlistMovie>>(new Map());

  useEffect(() => {
    const saved = LocalStorageService.get<[number, WishlistMovie][]>(WISHLIST_KEY);
    if (saved) setWishlist(new Map(saved));
  }, []);

  const isInWishlist = (id: number) => wishlist.has(id);

  const toggleWishlist = (movie: MovieDetails) => {
    const updated = new Map(wishlist);

    if (updated.has(movie.id)) {
      updated.delete(movie.id);
    } else {
      const wishListMove: WishlistMovie = MovieDetailsMapper.toWishlist(movie);
      updated.set(movie.id, wishListMove);
    }

    setWishlist(updated);
    LocalStorageService.set(WISHLIST_KEY, Array.from(updated.entries()));
  };

  return { wishlist: Array.from(wishlist.values()), isInWishlist, toggleWishlist };
};
