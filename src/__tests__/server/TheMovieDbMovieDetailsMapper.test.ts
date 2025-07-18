import type { MovieDetails } from '@/server/domain/models/MovieDetails';
import type { TheMovieDbDetails } from '@/server/infrastructure/dtos/TheMovieDbDetails';
import { TheMovieDbMovieDetailsMapper } from '@/server/infrastructure/mappers/TheMovieDbMovieDetailsMapper';

describe('TheMovieDbMovieDetailsMapper', () => {
  const mockDto: TheMovieDbDetails = {
    adult: false,
    backdrop_path: '/TXSxV23MWYkezZ3219gtgcSX6n.jpg',
    belongs_to_collection: null,
    budget: 4000000,
    genres: [
      {
        id: 12,
        name: 'Adventure',
      },
      {
        id: 16,
        name: 'Animation',
      },
      {
        id: 14,
        name: 'Fantasy',
      },
    ],
    homepage: '',
    id: 123,
    imdb_id: 'tt0077869',
    origin_country: ['US', 'GB'],
    original_language: 'en',
    original_title: 'The Lord of the Rings',
    overview:
      "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
    popularity: 2.6633,
    poster_path: '/liW0mjvTyLs7UCumaHhx3PpU4VT.jpg',
    production_companies: [
      {
        id: 286,
        logo_path: null,
        name: 'Fantasy Films',
        origin_country: '',
      },
      {
        id: 4921,
        logo_path: null,
        name: 'Bakshi Productions',
        origin_country: '',
      },
      {
        id: 141322,
        logo_path: null,
        name: 'Saul Zaentz Film Productions',
        origin_country: '',
      },
      {
        id: 60,
        logo_path: '/4YldLvCWQL9VIAHQ2Fu3Ffkh9Si.png',
        name: 'United Artists',
        origin_country: 'US',
      },
    ],
    production_countries: [
      {
        iso_3166_1: 'GB',
        name: 'United Kingdom',
      },
      {
        iso_3166_1: 'US',
        name: 'United States of America',
      },
    ],
    release_date: '1978-11-15',
    revenue: 30500000,
    runtime: 132,
    spoken_languages: [
      {
        english_name: 'English',
        iso_639_1: 'en',
        name: 'English',
      },
    ],
    status: 'Released',
    tagline: 'Fantasy...beyond your imagination',
    title: 'The Lord of the Rings',
    video: false,
    vote_average: 6.605,
    vote_count: 975,
  };

  const mockDomain: MovieDetails = {
    id: 123,
    title: 'The Lord of the Rings',
    description:
      "The Fellowship of the Ring embark on a journey to destroy the One Ring and end Sauron's reign over Middle-earth.",
    backdropPath: 'https://image.tmdb.org/t/p/w780/TXSxV23MWYkezZ3219gtgcSX6n.jpg',
    posterPath: 'https://image.tmdb.org/t/p/w500/liW0mjvTyLs7UCumaHhx3PpU4VT.jpg',
  };

  it('should map TheMovieDbDetails to MovieDetails', () => {
    const result = TheMovieDbMovieDetailsMapper.toDomain(mockDto);

    expect(result).toEqual(mockDomain);
  });
});
