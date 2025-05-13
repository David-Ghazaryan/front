import PricingItem from './pricing-item.jsx';
import Title from '../../../components/titles/titles.jsx';
import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import GorcUxiService from '../../../services/gorcuxi_service.js';
const service = new GorcUxiService();

const PricingItems = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const pricingData = await service.getAllPricing();
        if (pricingData && pricingData.length > 0) {
          setPrices(pricingData);
        } else {
          setPrices([]);  
        }
      } catch (error) {
        setError(error);
        console.error("Error loading company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Title text={"Արժեքները"} />
        <div className="grid grid-cols-3 gap-[70px]">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={350}
              height={230}
              sx={{
                bgcolor: '#0f687e80',
                animationDuration: '1s',
                borderRadius: '30px',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Title text={"Արժեքները"} />
        <p className="text-red-500 text-lg">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Title text={"Արժեքները"} />
      <div className="grid grid-cols-3 gap-[70px]">
        {prices.length > 0 ? (
          prices.map((pricing) => (
            <PricingItem
              key={pricing.id}
              title={pricing.title}
              price={`${pricing.price} AMD`}
              maxJobCount={pricing.maxJobCount}
            />
          ))
        ) : (
          <p className="text-gray-500">Արժեքները դեռ չեն բեռնվել կամ չկա նմանատիպ տվյալ</p>
        )}
      </div>
    </div>
  );
};

export default PricingItems;
