import { http, HttpResponse, type RequestHandler } from 'msw';
import firstPage from './movies-page-1.json';
import secondPage from './movies-page-2.json';

const moviesHandlers: Array<RequestHandler> = [
  http.get('/api/movies/:category', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const data = page === '1' ? firstPage : secondPage;

    return HttpResponse.json(data);
  }),
];

export default moviesHandlers;
