import { Router } from 'express';
import {
  getNowPlayingMoviesController,
  getPopularMoviesController,
  getTopRatedMoviesController,
} from '../controllers/MoviesController';
import { createMovieRepository } from '@/server/infrastructure/factories/movieRepositoryFactory';

const router = Router();
const repository = createMovieRepository();

router.get('/now-playing', getNowPlayingMoviesController(repository));
router.get('/popular', getPopularMoviesController(repository));
router.get('/top-rated', getTopRatedMoviesController(repository));

export default router;
