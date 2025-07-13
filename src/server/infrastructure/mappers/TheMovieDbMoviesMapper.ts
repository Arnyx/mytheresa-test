import type { TheMovieDbMovie } from '@/server/infrastructure/dtos/TheMovieDbMovie';
import type { Movie } from '@/server/domain/models/Movie';

export class MovieMapper {
  static toDomain(dto: TheMovieDbMovie): Movie {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.overview,
      imageUrl: dto.poster_path ? `https://image.tmdb.org/t/p/w500${dto.poster_path}` : '',
    };
  }

  static fromDtoList(dtoList: Array<TheMovieDbMovie>): Array<Movie> {
    return dtoList.map(MovieMapper.toDomain);
  }
}
