import { http, HttpResponse, type RequestHandler } from 'msw';
import firstPage from './movies-page-1.json';
import secondPage from './movies-page-2.json';
import tmdbMovies from './movies-tmdb.json';
import { MOCK_TMDB_BASE_URL } from '../../mocks.config';

const moviesHandlers: Array<RequestHandler> = [
  http.get('/api/movies/:category', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const data = page === '1' ? firstPage : secondPage;

    return HttpResponse.json(data);
  }),

  http.get(`${MOCK_TMDB_BASE_URL}/movie/now_playing`, () => {
    return HttpResponse.json(tmdbMovies);
  }),
];

export default moviesHandlers;
