import { type RequestHandler } from 'msw';
import moviesHandlers from './movies/handlers';

const handlers: Array<RequestHandler> = [...moviesHandlers];

export default handlers;
