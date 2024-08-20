import React from 'react';

interface StarRatingProps {
  averageRating: number;
}

const StarIcon: React.FC<{ type: 'full' | 'half' | 'empty' }> = ({ type }) => {
  const commonClasses = "h-5 w-5";
  const fillColor = type === 'empty' ? '#d1d5db' : 'currentColor';
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${commonClasses} ${type === 'empty' ? 'text-gray-300' : 'text-rose-600'}`} viewBox="0 0 24 24" fill={fillColor}>
      {type === 'half' && (
        <defs>
          <linearGradient id="halfStarGradient">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>
      )}
      <path
        fill={type === 'half' ? "url(#halfStarGradient)" : undefined}
        d="M12 17.3l6.18 3.73-1.64-7.03L21.9 9.27l-7.19-.61L12 2.5 9.29 8.66l-7.19.61 5.36 4.73L5.82 21.03z"
      />
    </svg>
  );
};

const StarRating: React.FC<StarRatingProps> = ({ averageRating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} type="full" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarIcon key={i} type="half" />);
      } else {
        stars.push(<StarIcon key={i} type="empty" />);
      }
    }

    return stars;
  };

  return (
    <div className="flex flex-wrap items-center">
      {renderStars()}
    </div>
  );
};

export default React.memo(StarRating);