import type { ButtonHTMLAttributes } from 'react';

interface CarouselScrollButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'left' | 'right';
}

export const CarouselScrollButton = ({ direction, ...props }: CarouselScrollButtonProps) => {
  const isLeft = direction === 'left';
  const label = isLeft ? 'Scroll Left' : 'Scroll Right';
  const symbol = isLeft ? '\u2039' : '\u203A';

  return (
    <button
      className={`movies-carousel__button movies-carousel__button--${direction}`}
      type="button"
      aria-label={label}
      {...props}
    >
      {symbol}
    </button>
  );
};
