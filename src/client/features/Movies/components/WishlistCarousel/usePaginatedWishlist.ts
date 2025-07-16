import { useWishlist } from '@shared/hooks/useWishlist';
import { useState, useMemo, useCallback } from 'react';

const PAGE_SIZE = 10;

export const usePaginatedWishlist = () => {
  const { wishlist } = useWishlist();
  const [page, setPage] = useState(1);

  const paginatedWishlist = useMemo(() => wishlist.slice(0, page * PAGE_SIZE), [wishlist, page]);
  const hasMore = wishlist.length > page * PAGE_SIZE;

  const loadMore = useCallback(() => {
    if (hasMore) setPage((page) => page + 1);
  }, [hasMore]);

  return { paginatedWishlist, hasMore, loadMore };
};
