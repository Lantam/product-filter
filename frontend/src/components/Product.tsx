import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductType } from '../types/Product';
import StarRating from './StarRating';
import NumberOfRatings from './NumberOfRatings';

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  return (
    <div
      className={`flex flex-col bg-white dark:bg-zinc-700 p-2 mb-4 m-1 sm:m-2 rounded-lg shadow-md hover:shadow-xl hover:shadow-black/25 dark:hover:shadow-rose-600/45 transition-all duration-300 max-w-sm cursor-pointer`}
      onClick={handleClick}
    >
      <div className='w-full aspect-w-1 aspect-h-1'>
        <img className='object-cover rounded-lg' src={product.image} alt={product.title} />
      </div>
      <div className='mt-2'>
        <div className='mb-1'>
          <div className='text-lg sm:text-lg text-black dark:text-white font-medium leading-none sm:leading-none mb-1 transition-colors duration-300'>{product.title}</div>
          <div className='text-sm text-gray-500 dark:text-zinc-400 font-medium leading-none sm:leading-none transition-colors duration-300'>{product.category?.name}</div>
        </div>
        <div className='text-sm'>
          <div className='flex flex-row'>
            <StarRating averageRating={product.averageRating} />
            <NumberOfRatings productId={product.id} numberOfRatings={product.numberOfRatings} />
          </div>
        </div>
        <div className='flex items-start text-black dark:text-zinc-200 leading-none mt-1 font-medium shadow-2xl text-lg'>
          <div className='bg-rose-200 dark:bg-zinc-600 px-2 py-1 rounded-lg shadow-2xl shadow-black transition-colors duration-300'>
            {product.price}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Product);