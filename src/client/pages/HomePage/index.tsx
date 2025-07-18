import { MoviesCarousel, WishlistCarousel } from '@features/Movies';
import './home-page.scss';

export const HomePage = () => {
  return (
    <section className="home-page">
      <MoviesCarousel type="now-playing" title="Now playing" />
      <MoviesCarousel type="popular" title="Popular" />
      <MoviesCarousel type="top-rated" title="Top rated" />
      <WishlistCarousel />
    </section>
  );
};

export default HomePage;
