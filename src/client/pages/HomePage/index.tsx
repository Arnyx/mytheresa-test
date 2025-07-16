import { MoviesCarousel, WishlistCarousel } from '@features/Movies';
import './home-page.scss';

export const HomePage = () => {
  return (
    <section className="home-page">
      <div>
        <MoviesCarousel type="now-playing" title="Now playing" />
      </div>
      <div>
        <MoviesCarousel type="popular" title="Popular" />
      </div>
      <div>
        <MoviesCarousel type="top-rated" title="Top rated" />
      </div>
      <div>
        <WishlistCarousel />
      </div>
    </section>
  );
};

export default HomePage;
