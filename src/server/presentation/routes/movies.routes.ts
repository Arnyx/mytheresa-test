import { createMovieRepository } from '@/server/infrastructure/factories/movieRepositoryFactory';
import { Router } from 'express';
import {
  getNowPlayingMoviesController,
  getPopularMoviesController,
  getTopRatedMoviesController,
} from '../controllers/MoviesController';

const router = Router();
const repository = createMovieRepository();

router.get('/now-playing', getNowPlayingMoviesController(repository));
router.get('/popular', getPopularMoviesController(repository));
router.get('/top-rated', getTopRatedMoviesController(repository));

export default router;
