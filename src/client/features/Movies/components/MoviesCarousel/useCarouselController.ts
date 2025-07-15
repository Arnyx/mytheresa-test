import { useCallback, useEffect, useRef, useState } from 'react';
import type { EmblaCarouselType, EngineType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  slidesLength: number;
  onEndReached: () => void;
};

const COPY_ENGINE_MODULES_ON_RELOAD: (keyof EngineType)[] = [
  'scrollBody',
  'location',
  'offsetLocation',
  'previousLocation',
  'target',
];

export const useEmblaCarouselController = ({ slidesLength, onEndReached }: Props) => {
  const listenForScrollRef = useRef(true);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const [loadingMore, setLoadingMore] = useState(false);
  const [slidesInView, setSlidesInView] = useState<Set<number>>(new Set());
  const hasLoaded = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'keepSnaps',
    watchResize: false,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();
        emblaApi.reInit();

        const newEngine = emblaApi.internalEngine();
        COPY_ENGINE_MODULES_ON_RELOAD.forEach((engineModule) => {
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
    if (hasLoaded.current || !slidesLength || !emblaApi) return;

    hasLoaded.current = true;
    emblaApi.reInit();
  }, [emblaApi, slidesLength]);

  const onScroll = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!listenForScrollRef.current) return;

      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);

      if (!loadingMore && lastSlideInView) {
        listenForScrollRef.current = false;
        setLoadingMore(true);
        onEndReached();
      }
    },
    [loadingMore, onEndReached]
  );

  useEffect(() => {
    if (!emblaApi) return;
    scrollListenerRef.current = () => onScroll(emblaApi);
    emblaApi.on('scroll', scrollListenerRef.current);

    const onResize = () => emblaApi.reInit();
    window.addEventListener('resize', onResize);

    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize));
  }, [emblaApi, onScroll]);

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    const inView = emblaApi.slidesInView();
    setSlidesInView((prev) => new Set([...prev, ...inView]));
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    updateSlidesInView(emblaApi);
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);
  }, [emblaApi, updateSlidesInView]);

  return { emblaRef, emblaApi, slidesInView };
};
