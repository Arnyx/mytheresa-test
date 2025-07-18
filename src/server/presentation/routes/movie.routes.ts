import { Router } from 'express';
import { getMovieDetailsController } from '../controllers/MoviesController';
import { createMovieRepository } from '@/server/infrastructure/factories/MovieRepositoryFactory';

const router = Router();
const repository = createMovieRepository();

router.get('/:id', getMovieDetailsController(repository));

export default router;
