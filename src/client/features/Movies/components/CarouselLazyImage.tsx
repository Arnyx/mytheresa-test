import { useCallback, useState } from 'react';
import './carousel.scss';

interface Props {
  inView: boolean;
  src?: string;
}

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;

export const CarouselLazyImage = ({ inView, src }: Props) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  return (
    <div className="movies-carousel__slide">
      <div className={'movies-carousel__lazy-load'.concat(hasLoaded ? ' movies-carousel__lazy-load--has-loaded' : '')}>
        <img
          className="movies-carousel__image"
          onLoad={setLoaded}
          src={inView && src ? src : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={src}
        />
      </div>
    </div>
  );
};
