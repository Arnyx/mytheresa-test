import type { Movie } from '@/server/domain/models/Movie';
import type { MovieType } from '../../types/MovieType';
import './carousel.scss';
import CarouselBody from './CarouselBody';
import { useEmblaCarouselController } from './useCarouselController';

interface Props {
  title: string;
  items: Movie[];
  type?: MovieType;
  onEndReached?: () => void;
}

const Carousel = ({ title, items, type, onEndReached }: Props) => {
  const emblaControllerProps = useEmblaCarouselController({
    slidesLength: items.length,
    onEndReached: onEndReached ?? (() => {}),
  });

  return (
    <section className="movies-carousel">
      <h1 className="movies-carousel__title">{title}</h1>
      <div className="movies-carousel__wrapper">
        {items.length ? (
          <CarouselBody {...emblaControllerProps} items={items} type={type} />
        ) : (
          <div className="movies-carousel__loading-placeholder" />
        )}
      </div>
    </section>
  );
};

export default Carousel;
