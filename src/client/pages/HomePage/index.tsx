import { MoviesCarousel } from '@/client/features/Movies/components/MoviesCarousel';

export const HomePage = () => {
  console.log('HomePage rendered');
  return (
    <section>
      <h1>Discover Movies</h1>
      <MoviesCarousel type="now-playing" title="Now playing" />
    </section>
  );
};

export default HomePage;
