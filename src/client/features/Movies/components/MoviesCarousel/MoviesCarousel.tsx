import Carousel from '@shared/components/Carousel/Carousel';
import type { MovieType } from '@shared/types/MovieType';
import { useInfiniteMovies } from '../../hooks/useInfiniteMovies';

interface Props {
  type: MovieType;
  title: string;
  page?: number;
}

const MoviesCarousel = ({ type, title }: Props) => {
  const { slides, incrementPage } = useInfiniteMovies(type);

  return <Carousel title={title} items={slides} type={type} onEndReached={incrementPage} />;
};

export default MoviesCarousel;
