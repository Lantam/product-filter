import React from 'react';
import StarRating from './StarRating';

export interface AccordionConfig {
    key: string;
    title: React.ReactNode;
    content: (product: any) => React.ReactNode;
  }

export const getAccordionConfig = (product: any): AccordionConfig[] => [
  {
    key: 'ratings',
    title: (
      <div className="flex flex-row items-center justify-between w-full mr-4">
        <h2 className="text-zinc-800 dark:text-white text-lg font-medium transition-all duration-300">Ratings</h2>
        <StarRating averageRating={product.averageRating} />
      </div>
    ),
    content: (product) => (
      <div>
        <span className='text-zinc-800 dark:text-zinc-300'>Nothing here yet</span>
      </div>
    ),
  },
  {
    key: 'Product details',
    title: <h2 className="text-zinc-800 dark:text-white text-lg font-medium transition-all duration-300">Product Details</h2>,
    content: (product) => (
      <span className='text-zinc-800 dark:text-zinc-300'>{product.description}</span>
    ),
  },
  {
    key: 'Shipping Information',
    title: <h2 className="text-zinc-800 dark:text-zinc-100 text-lg font-medium transition-all duration-300">Shipping information</h2>,
    content: (product) => (
      <div className='flex flex-col text-zinc-800 dark:text-zinc-300'>
        <span>{product.available ? 'Available' : 'Not Available'}</span>
        <span>Free shipping on orders over $50</span>
      </div>
    ),
  },
];