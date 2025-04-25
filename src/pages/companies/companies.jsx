import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';

import CompaniesItem from "./companies-item";
import OnTop from '../../components/onTop/onTop';
import axios from 'axios';
import config from '../../config/public';

const postsPerPage = 8;

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [search, setSearch] = useState(''); // Search query
  const [allCompanies, setAllCompanies] = useState([]); // All companies
  const [filteredCompanies, setFilteredCompanies] = useState([]); // Filtered companies

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const response = await axios.get(`${config.BACK_URL}/api/company?page=1&limit=10000`);
        setAllCompanies(response.data.data);
        setFilteredCompanies(response.data.data); // Initially set filtered companies to all
      } catch (err) {
        setError("Չհաջողվեց բեռնել ընկերությունները");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    const filtered = allCompanies.filter(company =>
      company.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredCompanies(filtered);

    // Reset to first page when search query changes
    setSearchParams({ page: 1 });
  }, [search, allCompanies, setSearchParams]);

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(filteredCompanies.length / postsPerPage); // Calculate total pages

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <div className="container">
        <div className="flex flex-col items-center">
          <Skeleton variant="text" width={300} height={40} />
          <Skeleton variant="text" width={400} height={20} />
        </div>

        <div className="flex justify-center gap-10 mt-5">
          <div className="w-[450px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px] p-4">
            <Skeleton variant="text" width={200} height={30} />
            <Skeleton variant="text" width={120} height={25} className="mt-3" />
            <Skeleton variant="rectangular" width="100%" height={60} className="mt-5" />
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-[800px] h-[60px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between px-4">
              <Skeleton variant="text" width={250} height={30} />
            </div>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[800px] h-[120px] bg-[var(--itemColor)] shadow-lg rounded-[8px] p-4 flex gap-4"
              >
                <Skeleton variant="rectangular" width={80} height={80} />
                <div className="flex flex-col justify-center gap-2 w-full">
                  <Skeleton variant="text" width="60%" height={25} />
                  <Skeleton variant="text" width="40%" height={20} />
                  <Skeleton variant="text" width="50%" height={20} />
                </div>
              </div>
            ))}
            <Stack className="my-5 flex items-center justify-center">
              <Skeleton variant="rectangular" width={300} height={40} />
            </Stack>
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <OnTop />
      <div className="container">
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
                <p className="text-[18px] font-bold text-[var(--primary)]" onClick={() => setSearch('')}>
                  Մաքրել Բոլորը
                </p>
              </div>
              <input
                type="text"
                className="w-[420px] h-[60px] rounded-[8px] px-4 border border-gray-300 mt-5 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition duration-300"
                placeholder="Որոնել կազմակերպություն..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="w-[800px] h-[60px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
              <p className="ml-4 text-[var(--primary)] font-bold">
                Գտնվել է՝ {filteredCompanies.length} կազմակերպություն
              </p>
            </div>
            {currentCompanies.map((company) => (
              <CompaniesItem
                key={company.id}
                id={company.id}
                logo={`${config.BACK_URL}${company.logo}`}
                companyName={company.title}
                city={company.city || "Քաղաքը նշված չէ"}
                industry={company.industry || "Ոլորտը նշված չէ"}
                count={company.jobs.length}
              />
            ))}

            {totalPages > 1 && (
              <Stack className="my-5 flex items-center justify-center">
                <Pagination
                  count={totalPages}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
