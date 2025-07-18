import { useCallback, useEffect, useRef, useState } from 'react';
import type { EmblaOptionsType, EngineType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

type Props = {
  onEndReached: () => void;
};

const EMBLA_OPTIONS: EmblaOptionsType = {
  dragFree: true,
  containScroll: 'keepSnaps',
  watchResize: false,
  slidesToScroll: 5,
};

const COPY_ENGINE_MODULES_ON_RELOAD: (keyof EngineType)[] = [
  'scrollBody',
  'location',
  'offsetLocation',
  'previousLocation',
  'target',
];

export const useEmblaCarouselController = ({ onEndReached }: Props) => {
  const listenForScrollRef = useRef(true);
  const [slidesInView, setSlidesInView] = useState<Set<number>>(new Set());

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...EMBLA_OPTIONS,
    watchSlides: (emblaApi) => {
      const getEngine = () => emblaApi.internalEngine();

      const restoreEngineState = (oldEngine: EngineType, newEngine: EngineType) => {
        COPY_ENGINE_MODULES_ON_RELOAD.forEach((module) => {
          Object.assign(newEngine[module], oldEngine[module]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();
      };

      const reloadEmbla = () => {
        const oldEngine = getEngine();
        emblaApi.reInit();
        const newEngine = getEngine();

        restoreEngineState(oldEngine, newEngine);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = () => {
        emblaApi.off('pointerUp', reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = getEngine();
      if (engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on('pointerUp', reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  const handleScroll = useCallback(() => {
    if (!emblaApi || !listenForScrollRef.current) return;

    const lastSlide = emblaApi.slideNodes().length - 1;
    if (emblaApi.slidesInView().includes(lastSlide)) {
      listenForScrollRef.current = false;
      onEndReached();
    }
  }, [emblaApi, onEndReached]);

  const handleResize = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
  }, [emblaApi]);

  const updateSlidesInView = useCallback(() => {
    if (!emblaApi) return;

    setSlidesInView((prev) => {
      const inView = emblaApi.slidesInView();
      return new Set([...prev, ...inView]);
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    emblaApi.on('destroy', () => window.removeEventListener('resize', handleResize));

    return () => {
      emblaApi.off('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [emblaApi, handleScroll, handleResize]);

  useEffect(() => {
    if (!emblaApi) return;

    updateSlidesInView();
    emblaApi.on('slidesInView', updateSlidesInView);
    emblaApi.on('reInit', updateSlidesInView);

    return () => {
      emblaApi.off('slidesInView', updateSlidesInView);
      emblaApi.off('reInit', updateSlidesInView);
    };
  }, [emblaApi, updateSlidesInView]);

  return { emblaApi, slidesInView, emblaRef };
};
