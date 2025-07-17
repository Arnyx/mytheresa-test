import { type RequestHandler } from 'msw';
import moviesHandlers from './movies/handlers';
import movieHandlers from './movie/handlers';

const handlers: Array<RequestHandler> = [...moviesHandlers, ...movieHandlers];

export default handlers;
