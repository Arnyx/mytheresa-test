import { WishlistCarousel } from '@/client/features/Movies';
import { WISHLIST_KEY } from '@/client/shared/hooks/useWishlist';
import LocalStorageService from '@/client/shared/services/LocalStorageService';
import type { WishlistMovie } from '@/client/shared/types/WishListMove';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { screen } from '@testing-library/react';

const wishlistedMovie: [[number, WishlistMovie]] = [
  [
    123,
    {
      id: 123,
      title: 'Shadow of the Phoenix',
      posterPath: 'https://example.com/poster/fake-poster-shadow-phoenix.jpg',
      backdropPath: 'https://example.com/backdrops/fake-backdrop-shadow-phoenix.jpg',
    },
  ],
];

describe('<WishListCarousel />', () => {
  test('renders movies based on storage', async () => {
    LocalStorageService.set(WISHLIST_KEY, wishlistedMovie);

    renderWithProviders(<WishlistCarousel />);

    const movie = screen.getByRole('link', { name: 'Shadow of the Phoenix' });
    expect(movie).toBeInTheDocument();
  });
});
