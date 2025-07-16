import { createMovieRepository } from '@/server/infrastructure/factories/movieRepositoryFactory';
import { Router } from 'express';
import { getMovieDetailsController } from '../controllers/MoviesController';

const router = Router();
const repository = createMovieRepository();

router.get('/:id', getMovieDetailsController(repository));

export default router;
