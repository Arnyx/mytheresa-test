import type { TheMovieDbMovie } from '@/server/infrastructure/dtos/TheMovieDbMovie';
import type { Movie } from '@/server/domain/models/Movie';

export class TheMovieDbMoviesMapper {
  static toDomain(dto: TheMovieDbMovie): Movie {
    return {
      id: dto.id,
      title: dto.title,
      backdropPath: dto.poster_path ? `https://image.tmdb.org/t/p/w500${dto.backdrop_path}` : '',
      posterPath: dto.poster_path ? `https://image.tmdb.org/t/p/w500${dto.poster_path}` : '',
    };
  }

  static fromDtoList(dtoList: Array<TheMovieDbMovie>): Array<Movie> {
    return dtoList.map(TheMovieDbMoviesMapper.toDomain);
  }
}
