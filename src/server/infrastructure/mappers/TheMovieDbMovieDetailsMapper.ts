import type { TheMovieDbDetails } from '@/server/infrastructure/dtos/TheMovieDbDetails';
import type { MovieDetails } from '@/server/domain/models/MovieDetails';

export class TheMovieDbMovieDetailsMapper {
  static toDomain(dto: TheMovieDbDetails): MovieDetails {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.overview,
      imageUrl: dto.poster_path ? `https://image.tmdb.org/t/p/w500${dto.backdrop_path}` : '',
    };
  }
}
