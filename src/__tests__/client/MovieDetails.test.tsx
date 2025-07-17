import { MovieDetails } from '@/client/features/MovieDetails/MovieDetails';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { screen } from '@testing-library/react';
import movieJson from '@/test-utils/mocks/handlers/movie/movie.json';
import userEvent from '@testing-library/user-event';
import { WISHLIST_KEY } from '@/client/shared/hooks/useWishlist';
import LocalStorageService from '@/client/shared/services/LocalStorageService';
import type { WishlistMovie } from '@/client/shared/types/WishListMove';

describe('<MovieDetails />', () => {
  test('renders all movie information properly', async () => {
    renderWithProviders(<MovieDetails id={123} />);

    const image = await screen.findByRole('img', { name: movieJson.title });
    const title = screen.getByRole('heading', { name: movieJson.title });
    const description = screen.getByText(movieJson.description);

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('should toggle movie to wishlist', async () => {
    renderWithProviders(<MovieDetails id={123} />);
    userEvent.setup();

    const addToWishlist = await screen.findByRole('button', { name: 'Add to Wishlist' });
    await userEvent.click(addToWishlist);

    const wishlistItems = LocalStorageService.get<[number, WishlistMovie][]>(WISHLIST_KEY);
    expect(wishlistItems?.[0][0]).toBe(123);

    const removeFromWishlist = await screen.findByRole('button', { name: 'Remove from Wishlist' });
    await userEvent.click(removeFromWishlist);

    const emptyWishlistItems = LocalStorageService.get<[number, WishlistMovie][]>(WISHLIST_KEY);

    expect(emptyWishlistItems).toHaveLength(0);
  });
});
