import { GetMovies } from '@/server/domain/use-cases/GetMovies';
import { TheMovieDbDatasourceImpl } from '@/server/infrastructure/datasources/impl/TheMovieDbDatasourceImpl';
import { MovieRepositoryImpl } from '@/server/infrastructure/repositories/MovieRepositoryImpl';
import type { Request, Response } from 'express';

export async function getMoviesController(_: Request, res: Response) {
  try {
    const datasource = new TheMovieDbDatasourceImpl();
    const repository = new MovieRepositoryImpl(datasource);
    const getPopularMovies = new GetMovies(repository);

    const movies = await getPopularMovies.execute();
    res.json(movies);
  } catch {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}
