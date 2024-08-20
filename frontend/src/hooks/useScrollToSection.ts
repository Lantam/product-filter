import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToSection = () => {
  const location = useLocation();
  const scrollTargetRef = useRef<string | null>(null);

  useEffect(() => {
    if (location.state?.scrollToSection) {
      scrollTargetRef.current = location.state.scrollToSection;
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const timeoutId = setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  };

  return { scrollTargetRef, scrollToSection };
};

export default useScrollToSection;