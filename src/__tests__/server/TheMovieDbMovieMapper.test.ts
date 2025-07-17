import type { Movie } from '@/server/domain/models/Movie';
import type { TheMovieDbMovie } from '@/server/infrastructure/dtos/TheMovieDbMovie';
import { TheMovieDbMoviesMapper } from '@/server/infrastructure/mappers/TheMovieDbMoviesMapper';

describe('TheMovieDbMovieMapper', () => {
  const mockDto: Array<TheMovieDbMovie> = [
    {
      adult: false,
      backdrop_path: '/ovZasZ9EeZcp6UsrElkQ63hFCd.jpg',
      genre_ids: [14, 10751, 28],
      id: 1087192,
      original_language: 'en',
      original_title: 'How to Train Your Dragon',
      overview:
        'On the rugged isle of Berk, where Vikings and dragons have been bitter enemies for generations, Hiccup stands apart, defying centuries of tradition when he befriends Toothless, a feared Night Fury dragon. Their unlikely bond reveals the true nature of dragons, challenging the very foundations of Viking society.',
      popularity: 874.3321,
      poster_path: '/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
      release_date: '2025-06-06',
      title: 'How to Train Your Dragon',
      video: false,
      vote_average: 8.071,
      vote_count: 793,
    },
  ];

  const mockDomain: Movie = {
    id: 1087192,
    title: 'How to Train Your Dragon',
    backdropPath: 'https://image.tmdb.org/t/p/w500/ovZasZ9EeZcp6UsrElkQ63hFCd.jpg',
    posterPath: 'https://image.tmdb.org/t/p/w500/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
  };

  it('should map a single TheMovieDbMovie to Movie', () => {
    const result = TheMovieDbMoviesMapper.toDomain(mockDto[0]);

    expect(result).toEqual(mockDomain);
  });

  it('should map an array of TheMovieDbMovie to Movies', () => {
    const result = TheMovieDbMoviesMapper.fromDtoList(mockDto);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockDomain);
  });
});
