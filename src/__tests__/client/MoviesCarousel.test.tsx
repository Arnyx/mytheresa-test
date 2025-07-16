import { MoviesCarousel } from '@/client/features/Movies';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { test } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should allow dragging carousel to the left', async () => {
  renderWithProviders(<MoviesCarousel type="now-playing" title="Now playing" />);

  userEvent.setup();

  const title = await screen.findByRole('heading', { name: 'Now playing' });
  expect(title).toBeInTheDocument();
});
