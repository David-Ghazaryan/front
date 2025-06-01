import { useEffect, useState } from 'react';
import GorcUxiService from '../../../services/gorcuxi_service';
import Title from "../../../components/titles/titles";
import Skeleton from '@mui/material/Skeleton';
import CompanyItem from "./company-item";
import { Link } from "react-router-dom";
import config from "../../../config/public";
const service = new GorcUxiService();
const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); 
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const sortedCompanies = await service.getSortedCompanies(); 

        setCompanies(sortedCompanies); 
      } catch (err) {
        setError("Չհաջողվեց բեռնել ընկերությունները"); 
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies(); 
  }, []); 
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;

      if (width >= 1024) { 
        setItemsToShow(8);
      } else if (width >= 768) {
        setItemsToShow(6);
      } else if (width >= 640) { 
        setItemsToShow(4);
      } else {
        setItemsToShow(3);
      }
    };

    updateItems();

    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);
  if (loading) {
    return (
      <div className="container">
        <Title text={"Թոփ ընկերությունները"} />
        <div className="grid grid-cols-4 place-items-center gap-[50px]">
          {[...Array(8)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={270}
              height={270}
              sx={{
                bgcolor: '#0f687e80',
                animationDuration: '1s',
                borderRadius: '10px',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-5">{error}</p>; 
  }

  return (
   <div>
  <div className="container">
    <Title text={"Թոփ ընկերությունները"} />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-6 md:gap-5 lg:gap-10">
      {companies.slice(0, itemsToShow).map((company) => (
        <CompanyItem
          key={company.id}
          id={company.id}
          logo={`${config.BACK_URL}${company.logo}`}
          companyName={company.title || "Անանուն ընկերություն"}
          city={company.city || "Քաղաքը նշված չէ"}
          count={company.jobs?.length || 0}
        />
      ))}
    </div>
    <div className="flex justify-center py-[20px]">
      <p className="text-[var(--primary)] text-[20px] font-normal font-inter">
        <Link to="/companies">Տեսնել ավելին →</Link>
      </p>
    </div>
  </div>
</div>
  );
};

export default TopCompanies;
