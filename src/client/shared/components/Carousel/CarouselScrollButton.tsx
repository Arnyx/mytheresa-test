import type { ButtonHTMLAttributes } from 'react';

interface CarouselScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right';
  carouselId: string;
}

const CarouselScrollButton = ({ direction, carouselId, ...props }: CarouselScrollButtonProps) => {
  const isLeft = direction === 'left';
  const label = isLeft ? 'Scroll Left' : 'Scroll Right';
  const symbol = isLeft ? '\u2039' : '\u203A';

  return (
    <button
      className={`movies-carousel__button movies-carousel__button--${direction}`}
      type="button"
      aria-label={label}
      aria-controls={carouselId}
      {...props}
    >
      {symbol}
    </button>
  );
};

export default CarouselScrollButton;
