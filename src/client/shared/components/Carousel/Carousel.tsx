import type { Movie } from '@/server/domain/models/Movie';
import './carousel.scss';
import { useEmblaCarouselController } from './useCarouselController';
import { Link } from 'react-router-dom';
import { CarouselLazyImage } from './CarouselLazyImage';
import { useScrollButtons } from './useScrollButtons';
import { CarouselScrollButton } from './CarouselScrollButton';

interface Props {
  title: string;
  items: Movie[];
  onEndReached?: () => void;
}

const Carousel = ({ title, items, onEndReached }: Props) => {
  const { emblaApi, slidesInView, emblaRef } = useEmblaCarouselController({
    slidesLength: items.length,
    onEndReached: onEndReached ?? (() => {}),
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useScrollButtons(emblaApi);

  if (!items.length) return null;

  return (
    <section className="movies-carousel">
      <h1>{title}</h1>
      <div className="movies-carousel__wrapper">
        <CarouselScrollButton direction="left" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="movies-carousel__viewport" ref={emblaRef}>
          <div className="movies-carousel__container">
            {items.map((movie, index) => (
              <Link to={`/details/${movie.id}`} key={movie.id} className="movies-carousel__slide">
                <CarouselLazyImage inView={slidesInView.has(index)} src={movie.posterPath} title={movie.title} />
              </Link>
            ))}
          </div>
        </div>
        <CarouselScrollButton direction="right" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default Carousel;
