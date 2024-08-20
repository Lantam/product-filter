import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_ID } from '../graphql/queries';
import StarRating from '../components/StarRating';
import Layout from '../components/Layout';
import NumberOfRatings from '../components/NumberOfRatings';
import DynamicAccordion from '../components/DynamicAccordion';
import { getAccordionConfig } from '../components/AccordionConfig';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId: productId },
    skip: !productId,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.productById) return <div>Product not found</div>;

  const product = data.productById;
  const imageUrl = product.image.startsWith('/') 
  ? product.image 
  : `/${product.image.replace(/\\/g, '/')}`;
  const accordionConfig = getAccordionConfig(product);

  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <ProductInfo product={product} imageUrl={imageUrl} />
        <div className='relative'>
          <DynamicAccordion config={accordionConfig} product={product} />
        </div>
      </div>
    </Layout>
  );
};

const ProductInfo: React.FC<{ product: any; imageUrl: string }> = ({ product, imageUrl }) => (
  <div className="flex flex-col lg:flex-row justify-center w-full">
    <ProductImages imageUrl={imageUrl} title={product.title} />
    <ProductDetails product={product} />
  </div>
);

const ProductImages: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
  <div className='flex w-full grid grid-cols-1 lg:grid-cols-2 gap-1 max-w-screen-2xl order-2 lg:order-1'>
    {[...Array(4)].map((_, index) => (
      <img key={index} className='w-full' src={imageUrl} alt={title} />
    ))}
  </div>
);

const ProductDetails: React.FC<{ product: any }> = ({ product }) => (
  <div className='lg:max-w-80 xl:max-w-104 2xl:max-w-112 lg:border-t border-gray-300 dark:border-zinc-600 order-1 lg:order-2'>
    <div className='flex flex-col flex-wrap px-4 sm:px-8 py-3 lg:p-5 xl:p-7 2xl:p-10 lg:w-80 xl:w-104 2xl:w-112'>
      <ProductHeader product={product} />
      <h1 className='mt-5'>
        <span className='text-zinc-800 dark:text-white text-3xl font-bold'>{product.title}</span>
      </h1>
      <div className='mt-2.5'>
        <span className='text-zinc-800 dark:text-white font-semibold leading-5'>$ {product.price}</span>
      </div>
    </div>
  </div>
);

const ProductHeader: React.FC<{ product: any }> = ({ product }) => (
  <div className='flex flex-row flex-wrap justify-between w-full'>
    <span className='text-gray-500 dark:text-zinc-400'>{product.category?.name}</span>
    <div className='flex flex-row'>
      <StarRating averageRating={product.averageRating} />
      <NumberOfRatings productId={product.id} numberOfRatings={product.numberOfRatings} />
    </div>
  </div>
);

export default ProductDetail;