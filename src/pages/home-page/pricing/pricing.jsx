import PricingItem from './pricing-item.jsx';
import Title from '../../../components/titles/titles.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import config from '../../../config/public.js';

const PricingItems = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const response = await axios.get(`${config.BACK_URL}/api/pricing`);
        setPrices(response.data);
      } catch (err) {
        setError("Չհաջողվեց բեռնել տվյալները");
        console.error(err);
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
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Title text={"Արժեքները"} />
      <div className="grid grid-cols-3 gap-[70px]">
        {prices.slice(0, 6).map((pricing) => (
          <PricingItem
            key={pricing.id}
            title={pricing.title}
            price={`${pricing.price} AMD`}
            maxJobCount={pricing.maxJobCount}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingItems;
