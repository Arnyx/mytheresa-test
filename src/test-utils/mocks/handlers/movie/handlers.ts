import { http, HttpResponse, type RequestHandler } from 'msw';
import movie from './movie.json';

const movieHandlers: Array<RequestHandler> = [
  http.get('/api/movie/:id', () => {
    return HttpResponse.json(movie);
  }),
];

export default movieHandlers;
