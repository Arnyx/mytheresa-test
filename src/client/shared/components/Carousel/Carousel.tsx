import type { Movie } from '@/server/domain/models/Movie';
import './carousel.scss';
import { useEmblaCarouselController } from './useCarouselController';
import { Link } from 'react-router-dom';
import { CarouselLazyImage } from './CarouselLazyImage';

interface Props {
  title: string;
  items: Movie[];
  onEndReached?: () => void;
}

const Carousel = ({ title, items, onEndReached }: Props) => {
  const { slidesInView, emblaRef } = useEmblaCarouselController({
    slidesLength: items.length,
    onEndReached: onEndReached ?? (() => {}),
  });

  if (!items.length) return null;

  return (
    <section className="movies-carousel">
      <h1>{title}</h1>
      <div className="movies-carousel__viewport" ref={emblaRef}>
        <div className="movies-carousel__container">
          {items.map((movie, index) => (
            <Link to={`/details/${movie.id}`} key={movie.id} className="movies-carousel__slide">
              <CarouselLazyImage inView={slidesInView.has(index)} src={movie.posterPath} title={movie.title} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
