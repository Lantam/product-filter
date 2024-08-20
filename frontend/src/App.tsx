import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './pages/Home';
import Account from './pages/Account';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import { ThemeProvider } from './components/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ScrollToTop resetPaths={['/product/:productId']} />
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/account" element={<Account />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </ThemeProvider>
        </Router>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;