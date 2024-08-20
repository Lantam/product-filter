import React, { useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import Product from './Product';
import { GET_ALL_PRODUCTS } from '../graphql/queries';

const PRODUCTS_PER_PAGE = 48;

const ProductList: React.FC = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_PRODUCTS, {
    variables: { first: PRODUCTS_PER_PAGE },
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const loadMoreProducts = useCallback(() => {
    if (data?.allProducts.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.allProducts.pageInfo.endCursor,
          first: PRODUCTS_PER_PAGE,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            allProducts: {
              ...fetchMoreResult.allProducts,
              edges: [
                ...prevResult.allProducts.edges,
                ...fetchMoreResult.allProducts.edges,
              ],
            },
          };
        },
      });
    }
  }, [data, fetchMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        loadMoreProducts();
      }
    }, options);

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreProducts, loading]);

  return (
    <div className='p-2 sm:p-4 flex flex-col justify-center items-center'>
      {error ? (
        <p className="text-red-500 text-center">Error: {error.message}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-2 max-w-screen-2xl w-full">
            {data?.allProducts.edges.map(({ node }: any) => (
              <div key={node.id}>
                <Product product={node} />
              </div>
            ))}
          </div>
          <div ref={loadingRef} className="w-full text-center py-4">
            {loading && <p className="text-gray-500">Loading...</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;