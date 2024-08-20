import React from 'react';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto p-32 text-black dark:text-white transition-colors duration-300">
        <p className='text-2xl sm:text-4xl'>It's about</p>
        <div className='flex'>
          <h1 className="bg-rose-200 dark:bg-zinc-700 px-8 py-4 rounded-lg transition-colors duration-300">
            <span className='text-7xl sm:text-9xl'>The Fit</span>
          </h1>
        </div>
      </div>
      <div className='text-black dark:text-white transition-colors duration-300'>
        <ProductList />
      </div>
    </Layout>
  );
};

export default Home;