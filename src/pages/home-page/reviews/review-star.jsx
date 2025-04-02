/* eslint-disable react/prop-types */
import { useMemo } from "react";

const StarIcon = ({ fillPercentage, strokeWidth = 1, strokeLinejoin = "round" }) => (
    <svg width="35" height="35" viewBox="0 0 24 24">
      <defs>
        <clipPath id={`clip-${fillPercentage}`}>
          <rect width={`${fillPercentage}%`} height="100%" />
        </clipPath>
      </defs>
      <path
        d="M12 2l3 6 6 .5-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8z"
        fill="none"
        stroke='#0f687e'
        strokeWidth={strokeWidth} 
        strokeLinejoin={strokeLinejoin} 
        strokeLinecap="round" 
      />
      <path
        d="M12 2l3 6 6 .5-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8z"
        fill="#0f687e"
        clipPath={`url(#clip-${fillPercentage})`}
      />
    </svg>
  );
  

const StarRating = ({ value }) => {
  const stars = useMemo(() => {
    const fullStars = Math.floor(value);
    const hasPartialStar = value % 1 !== 0;

    return [...Array(5)].map((_, i) => {
      let fill = 0;
      if (i < fullStars) fill = 100;
      else if (i === fullStars && hasPartialStar) fill = (value % 1) * 100;

      return <StarIcon key={i} fillPercentage={fill} />;
    });
  }, [value]);

  return <div className="flex items-center space-x-1">{stars}</div>;
};

export default StarRating;
