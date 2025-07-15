import type { MovieType } from '@shared/types/MovieType';
import type { Movie } from '@/server/domain/models/Movie';
import { useInfiniteMovies } from '../../hooks/useInfiniteMovies';
import './carousel.scss';
import { CarouselLazyImage } from './CarouselLazyImage';
import { useEmblaCarouselController } from './useCarouselController';
import { Link } from 'react-router-dom';

interface Props {
  type: MovieType;
  title: string;
  page?: number;
}

const MoviesCarousel = ({ type, title }: Props) => {
  const { slides, incrementPage } = useInfiniteMovies(type);
  const { emblaRef, slidesInView } = useEmblaCarouselController({
    slidesLength: slides.length,
    onEndReached: incrementPage,
  });

  return (
    <section className="movies-carousel">
      <h1>{title}</h1>
      <div className="movies-carousel__viewport" ref={emblaRef}>
        <div className="movies-carousel__container">
          {slides.map((movie: Movie, index: number) => (
            <Link to={`/details/${movie.id}`} key={movie.id} className="movies-carousel__slide">
              <CarouselLazyImage inView={slidesInView.has(index)} src={movie.imageUrl} title={movie.title} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoviesCarousel;
