import Carousel from '@shared/components/Carousel/Carousel';
import { usePaginatedWishlist } from './usePaginatedWishlist';

const WishlistCarousel = () => {
  const { paginatedWishlist, hasMore, loadMore } = usePaginatedWishlist();

  return <Carousel title="Wishlist" items={paginatedWishlist} onEndReached={hasMore ? loadMore : undefined} />;
};

export default WishlistCarousel;
