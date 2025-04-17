import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CompaniesItem from "./companies-item";
import OnTop from '../../components/onTop/onTop';
import axios from 'axios';
import config from '../../config/public';

const Companies = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const text = "Որոնել...";
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(text.slice(0, index));
      index++ / 2;

      if (index > text.length) clearInterval(interval);
    }, 100);
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
        const response = await axios.get(`${config.BACK_URL}/api/company`);
        setCompanies(response.data.data);
      } catch (err) {
        setError("Չհաջողվեց բեռնել ընկերությունները");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = companies.slice(firstPostIndex, lastPostIndex);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]); 
  
  
  if (loading) {
    return <p>Բեռնվում է...</p>;
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <OnTop />
      <div className="container ">
        <div className="flex flex-col items-center">
          <p className="font-bold font-inter text-[32px] text-[var(--primary)]">
            Բացահայտիր ոլորտի առաջատարներին
          </p>
          <p className="font-extralight font-inter text-[14px] text-gray-500 pb-[15px] text-center">
            Կազմակերպություններ, որոնք ներկայումս ակտիվ են հարթակում։ <br /> Տես նրանց պրոֆիլները և ընթացիկ հայտարարությունները։
          </p>
        </div>
        <div className="flex justify-center gap-10">
          <div className="w-[450px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px]">
            <div className="p-4">
              <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
                <p className="text-[18px] font-bold">Որոնման Ֆիլտրներ</p>
                <p className="text-[18px] font-bold text-[var(--primary)]">Մաքրել Բոլորը</p>
              </div>
              <input
                type="text"
                className="w-[420px] h-[60px] rounded-[8px] px-4 border border-gray-300 mt-5
                          focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:white
                          focus:backdrop-white transition duration-300 input-animate"
                placeholder={placeholder}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-[800px] h-[60px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
              <p className="ml-4 text-[var(--primary)] font-bold">
                Գտնվել է՝ {companies.length} կազմակերպություն
              </p>
            </div>
            {currentPosts.map((company) => (
              <CompaniesItem
                key={company.id}
                id={company.id}
                logo={`${config.BACK_URL}${company.logo}`}
                companyName={company.title}
                city={company.location || "Քաղաքը նշված չէ"}
                industry={company.industry || "Ոլորտը նշված չէ"}
                count={company.jobs.length}
              />
            ))}
            <Stack className="my-5 flex items-center justify-center">
              <Pagination
                count={Math.ceil(companies.length / postsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderColor: '#0f687e !important',
                    color: '#0f687e !important',
                    transition: 'all 0.1s ease !important',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#0f687e !important',
                    color: '#DCE6F6 !important',
                    borderColor: '#0f687e !important',
                    transition: 'all 0.1s ease !important',
                  },
                }}

              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
