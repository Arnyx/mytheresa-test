import { MovieDetailsMapper } from '@/client/features/MovieDetails/mappers/MovieDetailsMapper';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import { useEffect, useState } from 'react';
import LocalStorageService from '../services/LocalStorageService';
import type { WishlistMovie } from '../types/WishListMove';

export const WISHLIST_KEY = 'mytheresa-test:wishlist';

export const useWishlist = () => {
  const [wishlistMap, setWishlistMap] = useState<Map<number, WishlistMovie>>(new Map());

  useEffect(() => {
    const saved = LocalStorageService.get<[number, WishlistMovie][]>(WISHLIST_KEY);
    if (saved) setWishlistMap(new Map(saved));
  }, []);

  const isInWishlist = (id: number) => wishlistMap.has(id);

  const toggleWishlist = (movie: MovieDetails) => {
    const updated = new Map(wishlistMap);
    if (updated.has(movie.id)) {
      updated.delete(movie.id);
    } else {
      updated.set(movie.id, MovieDetailsMapper.toWishlist(movie));
    }
    setWishlistMap(updated);
    LocalStorageService.set(WISHLIST_KEY, Array.from(updated.entries()));
  };

  return {
    wishlistMap,
    wishlist: Array.from(wishlistMap.values()),
    isInWishlist,
    toggleWishlist,
  };
};
