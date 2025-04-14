import { useEffect, useState } from 'react';
import NorthIcon from '@mui/icons-material/North';

const OnTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowButton(scrollTop > 200);
      setIsNearBottom(scrollTop + windowHeight >= documentHeight - 210);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleClick}
      className={`w-12 h-12 rounded-full flex items-center justify-center fixed bottom-10 right-2 cursor-pointer transition-all duration-300
        ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        ${isNearBottom ? 'bg-[var(--light)]' : 'bg-[var(--primary)]'}`
      }
    >
      <NorthIcon sx={{ 
        color: isNearBottom ? 'var(--primary)' : '#EDF1F9',
        transition: 'color 0.3s ease',
        }} 
      />
    </div>
  );
};

export default OnTop;
