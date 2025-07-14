import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Movie } from '@/server/domain/models/Movie';
import { fetchMoviesByType } from '@/client/api/fetchMoviesByType';
import type { MovieType } from '@/client/shared/types/MovieType';
import type { EmblaCarouselType, EngineType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CarouselImage } from './Image';
import './carousel.scss';

interface Props {
  type: MovieType;
  title: string;
  page?: number;
}

export const MovieCarousel = ({ type, title }: Props) => {
  const [slides, setSlides] = useState<Movie[]>([]);
  const listenForScrollRef = useRef(true);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const [loadingMore, setLoadingMore] = useState(false);
  const hasLoaded = useRef(false);
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['movies', type, page],
    queryFn: () => fetchMoviesByType({ type, page }),
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'keepSnaps',
    watchResize: false,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        const copyEngineModules: (keyof EngineType)[] = [
          'scrollBody',
          'location',
          'offsetLocation',
          'previousLocation',
          'target',
        ];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on('pointerUp', reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  useEffect(() => {
    if (!data?.length) return;

    setSlides((prev) => {
      const existingIds = new Set(prev.map((movie) => movie.id));
      const newUnique = data.filter((movie) => !existingIds.has(movie.id));
      return [...prev, ...newUnique];
    });
  }, [data]);

  useEffect(() => {
    if (hasLoaded.current || !slides.length || !emblaApi) return;

    hasLoaded.current = true;
    emblaApi.reInit();
  }, [emblaApi, slides.length]);

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!listenForScrollRef.current) return;

      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);

      if (!loadingMore && lastSlideInView) {
        listenForScrollRef.current = false;
        setLoadingMore(true);
        setPage((prev) => prev + 1);
      }
    },
    [loadingMore]
  );

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi.on('scroll', scrollListenerRef.current);
    },
    [onScroll]
  );

  useEffect(() => {
    if (!emblaApi) return;
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener('resize', onResize);
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize));
  }, [emblaApi, addScrollListener]);

  const [slidesInView, setSlidesInView] = useState<number[]>([]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    const inView = emblaApi.slidesInView();
    setSlidesInView((prev) => [...new Set([...prev, ...inView])]);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return (
    <section className="movies-carousel">
      <div className="movies-carousel__viewport" ref={emblaRef}>
        <div className="movies-carousel__container">
          {slides.map((movie: Movie, index: number) => (
            <CarouselImage key={movie.id} inView={slidesInView.includes(index)} src={movie.imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};
