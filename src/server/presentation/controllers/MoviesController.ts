import type { Request, Response } from 'express';
import type { MovieRepository } from '@/server/domain/repositories/MovieRepository';
import { GetNowPlayingMoviesUseCase } from '@/server/domain/use-cases/GetNowPlayingMoviesUseCase';
import { GetPopularMoviesUseCaseUseCase } from '@/server/domain/use-cases/GetPopularMoviesUseCase';
import { GetTopRatedMoviesUseCase } from '@/server/domain/use-cases/GetTopRatedMoviesUseCase';
import { safeParseInt } from '../helpers';

export function getNowPlayingMoviesController(repository: MovieRepository) {
  return async (req: Request, res: Response) => {
    try {
      const page = safeParseInt(req.query.page as string) || 1;
      const useCase = new GetNowPlayingMoviesUseCase(repository);
      const movies = await useCase.execute({ page });
      res.json(movies);
    } catch {
      res.status(500).json({ error: 'Failed to fetch now playing movies' });
    }
  };
}

export function getPopularMoviesController(repository: MovieRepository) {
  return async (req: Request, res: Response) => {
    try {
      const page = safeParseInt(req.query.page as string) || 1;
      const useCase = new GetPopularMoviesUseCaseUseCase(repository);
      const movies = await useCase.execute({ page });
      res.json(movies);
    } catch {
      res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
  };
}

export function getTopRatedMoviesController(repository: MovieRepository) {
  return async (req: Request, res: Response) => {
    try {
      const page = safeParseInt(req.query.page as string) || 1;
      const useCase = new GetTopRatedMoviesUseCase(repository);
      const movies = await useCase.execute({ page });
      res.json(movies);
    } catch {
      res.status(500).json({ error: 'Failed to fetch top rated movies' });
    }
  };
}
