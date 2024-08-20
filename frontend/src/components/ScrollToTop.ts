import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface ScrollToTopProps {
    resetPaths: string[];
  }

const matchPath = (path: string, pathname: string): boolean => {
  const paramRegex = path.replace(/:\w+/g, '[^/]+');
  const regex = new RegExp(`^${paramRegex}$`);
  return regex.test(pathname);
};

const ScrollToTop: React.FC<ScrollToTopProps> = ({ resetPaths }) => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      if (resetPaths.some((path) => matchPath(path, pathname))) {
        window.scrollTo(0, 0);
      }
    }, [pathname, resetPaths]);
  
    return null;
  };
  
  export default ScrollToTop;