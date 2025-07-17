import { MoviesCarousel } from '@/client/features/Movies';
import { CurrentPath } from '@/test-utils/CurrentPath';
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

describe('<MovieDetails />', () => {
  test('should fetch movies based on page', async () => {
    renderWithProviders(<MoviesCarousel type="now-playing" title="Now playing" />);
    const user = userEvent.setup();

    const title = await screen.findByRole('heading', { name: 'Now playing' });
    expect(title).toBeInTheDocument();

    const movie = await screen.findByRole('link', { name: 'The Last Shadow' });
    expect(movie).toBeInTheDocument();

    const rightScrollButton = screen.getByRole('button', { name: 'Scroll Right' });
    await user.click(rightScrollButton);

    act(() => scrollHandler!());

    const newMovie = await screen.findByRole('link', { name: 'Broken Chains' });
    expect(newMovie).toBeInTheDocument();
  });

  test('should redirect to details page', async () => {
    renderWithProviders(
      <>
        <MoviesCarousel type="now-playing" title="Now playing" />
        <CurrentPath />
      </>
    );

    const user = userEvent.setup();

    const movie = await screen.findByRole('link', { name: 'The Last Shadow' });
    expect(movie).toBeInTheDocument();

    await user.click(movie);

    const path = screen.getByTestId('current-path');
    expect(path).toHaveTextContent('/details/1');
  });
});
