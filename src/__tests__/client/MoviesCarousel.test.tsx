import { MoviesCarousel } from '@/client/features/Movies';
import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import { test } from 'vitest';

let scrollHandler: (() => void) | null = null;

vi.mock('embla-carousel-react', async () => {
  const actualEmbla = await vi.importActual('embla-carousel-react');

  const mockEmblaApi = {
    on: vi.fn().mockImplementation((event, handler) => {
      if (event === 'scroll') scrollHandler = handler;
      return mockEmblaApi;
    }),
    off: vi.fn(),
    scrollNext: vi.fn(),
    scrollPrev: vi.fn(),
    canScrollNext: vi.fn().mockReturnValue(true),
    canScrollPrev: vi.fn().mockReturnValue(true),
    reInit: vi.fn(),
    slidesInView: vi.fn().mockReturnValue([0, 1, 2, 3, 4, 5]),
    slideNodes: vi.fn().mockReturnValue([{}, {}, {}, {}, {}, {}]),
    internalEngine: vi.fn().mockReturnValue({}),
  };

  return {
    ...actualEmbla,
    default: vi.fn().mockImplementation(() => [vi.fn(), mockEmblaApi]),
  };
});

test('should fetch movies based on page', async () => {
  //TODO: Check onscroll event firing twice
  renderWithProviders(<MoviesCarousel type="now-playing" title="Now playing" />);

  userEvent.setup();

  const title = await screen.findByRole('heading', { name: 'Now playing' });
  expect(title).toBeInTheDocument();

  const movie = screen.getByRole('link', { name: 'The Last Shadow' });
  expect(movie).toBeInTheDocument();

  const rightScrollButton = screen.getByRole('button', { name: 'Scroll Right' });
  await userEvent.click(rightScrollButton);

  act(() => scrollHandler!());

  const newMovie = await screen.findByRole('link', { name: 'Broken Chains' });
  expect(newMovie).toBeInTheDocument();
});
