import type { MovieDetails } from '@/server/domain/models/MovieDetails';

export type WishlistMovie = Omit<MovieDetails, 'description'>;
