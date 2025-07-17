import { http, HttpResponse, type RequestHandler } from 'msw';
import movie from './movie.json';
import tmdbMovie from './movie-tmdb.json';
import { MOCK_TMDB_BASE_URL } from '../../mocks.config';

const movieHandlers: Array<RequestHandler> = [
  http.get('/api/movie/:id', () => {
    return HttpResponse.json(movie);
  }),

  http.get(`${MOCK_TMDB_BASE_URL}/movie/:id`, () => {
    return HttpResponse.json(tmdbMovie);
  }),
];

export default movieHandlers;
