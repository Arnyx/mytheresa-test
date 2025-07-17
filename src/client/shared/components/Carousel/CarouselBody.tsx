import { Link } from 'react-router-dom';
import { CarouselLazyImage } from './CarouselLazyImage';
import { CarouselScrollButton } from './CarouselScrollButton';
import type { Movie } from '@/server/domain/models/Movie';
import type { useEmblaCarouselController } from './useCarouselController';
import { useScrollButtons } from './useScrollButtons';
import type { MovieType } from '../../types/MovieType';

type CarouselBodyProps = ReturnType<typeof useEmblaCarouselController> & {
  carouselId: string;
  items: Array<Movie>;
  type?: MovieType;
};

const CarouselBody = ({ items, type, emblaApi, slidesInView, carouselId, emblaRef }: CarouselBodyProps) => {
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useScrollButtons(emblaApi);

  return (
    <>
      <CarouselScrollButton
        direction="left"
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        carouselId={carouselId}
      />
      <div className="movies-carousel__viewport" ref={emblaRef}>
        <div className="movies-carousel__container">
          {items.map((movie, index) => (
            <Link
              to={`/details/${movie.id}?type=${type ?? ''}`}
              key={movie.id}
              className="movies-carousel__slide"
              aria-label={movie.title}
            >
              <CarouselLazyImage inView={slidesInView.has(index)} src={movie.posterPath} title={movie.title} />
            </Link>
          ))}
        </div>
      </div>
      <CarouselScrollButton
        direction="right"
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        carouselId={carouselId}
      />
    </>
  );
};

export default CarouselBody;
