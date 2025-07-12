import { Router } from 'express';
import { getMoviesController } from '../controllers/MoviesController';

const router = Router();

router.use('/movies', getMoviesController);

export default router;
