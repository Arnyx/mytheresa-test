import { createMovieRepository } from '@/server/infrastructure/factories/movieRepositoryFactory';
import movies from '@/test-utils/mocks/handlers/movies/movies-page-1.json';
import movieDetails from '@/test-utils/mocks/handlers/movie/movie.json';

describe('TheMovieDbDatasourceImpl.test', () => {
  const datasource = createMovieRepository();

  it('returns now playing movies', async () => {
    const fetchedMovies = await datasource.getNowPlaying();

    expect(fetchedMovies).toEqual(movies);
  });

  it('returns movie details', async () => {
    const fetchedMovieDetails = await datasource.getDetails(1);

    expect(fetchedMovieDetails).toEqual(movieDetails);
  });
});
