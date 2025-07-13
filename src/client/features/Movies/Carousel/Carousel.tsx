import { useQuery } from '@tanstack/react-query';
import type { Movie } from '@/server/domain/models/Movie';
import { fetchMoviesByType } from '@/client/api/fetchMoviesByType';
import type { MovieType } from '@/client/shared/types/MovieType';
import './carousel.scss';

interface Props {
  type: MovieType;
  title: string;
  page?: number;
}

export const MovieCarousel = ({ type, title }: Props) => {
  const page = 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', type, page],
    queryFn: () => fetchMoviesByType({ type, page }),
  });

  if (isLoading) return <p>Loading {title}...</p>;
  if (error) return <p>Failed to load {title}</p>;

  return (
    <section className="movie-carousel">
      <h2>{title}</h2>
      <ul className="movie-carousel__list">
        {data?.map((movie: Movie) => (
          <li key={movie.id} className="movie-carousel__list-item">
            <img src={movie.imageUrl} alt={movie.title} className="movie-carousel__image" />
          </li>
        ))}
      </ul>
    </section>
  );
};
