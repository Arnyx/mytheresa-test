import type { Movie } from '@/server/domain/models/Movie';
import type { TheMovieDbDatasource } from '../TheMovieDbDatasource';

export class TheMovieDbDatasourceImpl implements TheMovieDbDatasource {
  async getMovies(): Promise<Array<Movie>> {
    return [
      {
        id: 1,
        title: 'Example Movie',
        description: 'This is an example movie.',
        imageUrl: 'https://example.com/image.jpg',
      },
    ];
  }
}
