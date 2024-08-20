import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NumberOfRatingsProps {
  productId: string;
  numberOfRatings: number;
}

const NumberOfRatings: React.FC<NumberOfRatingsProps> = ({ productId, numberOfRatings }) => {
  const navigate = useNavigate();

  const handleNumberClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${productId}`, { state: { scrollToSection: 'ratings' } });
  }, [navigate, productId]);

  return (
  <button
    className="text-zinc-600 dark:text-zinc-400 ml-0 sm:ml-1 transition-colors duration-300 hover:underline"
    onClick={handleNumberClick}
  >
    ({numberOfRatings})
  </button>
  )

}

export default NumberOfRatings;