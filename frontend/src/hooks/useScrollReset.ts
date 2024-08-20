import { useEffect, useRef } from 'react';

const useScrollReset = (shouldReset: boolean | (() => boolean)) => {
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (typeof shouldReset === 'function' ? shouldReset() : shouldReset) {
        if (ref.current) {
          ref.current.scrollTop = 0;
        }
      }
    }, [shouldReset]);
  
    return ref;
  };
  
  export default useScrollReset;