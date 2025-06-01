/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import config from '../../config/public';
import CompaniesItem from './companies-item';
import OnTop from '../../components/onTop/onTop';
import GorcUxiService from '../../services/gorcuxi_service';
import { Skeleton } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const COMPANIES_PER_PAGE = 6;
const service = new GorcUxiService();

const Companies = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [allCompanies, setAllCompanies] = useState([]);
  const [hasJob, setHasJob] = useState(false);


  
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('q') || '';
  const cityArray = [
  "Երևան",
  "Գյումրի",
  "Վանաձոր",
  "Վաղարշապատ",
  "Հրազդան",
  "Աբովյան",
  "Կապան",
  "Չարենցավան",
  "Գավառ",
  "Արտաշատ",
  "Մասիս",
  "Սիսյան",
  "Արմավիր",
  "Սպիտակ",
  "Սևան",
  "Ալավերդի",
  "Իջևան",
  "Եղեգնաձոր",
  "Բերդ",
  "Դիլիջան",
  "Այլ"
];
const [selectedCities, setSelectedCities] = useState([]);

  const handleToggle = (city) => {
  const isSame = selectedCities[0] === city;
  const updated = isSame ? [] : [city];

  const params = new URLSearchParams(searchParams);
  if (updated.length > 0) {
    params.set('city', city);
  } else {
    params.delete('city');
  }
  setSearchParams(params);

  setSelectedCities(updated);
};

useEffect(() => {
  const cityParam = searchParams.get('city');
  if (cityParam) {
    setSelectedCities(cityParam.split(','));
  }
}, [searchParams]);
useEffect(() => {
  const hasJobParam = searchParams.get('hasJob') === 'true';
  setHasJob(hasJobParam);
}, [searchParams]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await service.getAllCompanies(1, 1000, '');

        if (data?.data && Array.isArray(data.data)) {
          setAllCompanies(data.data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        setError('Failed to load companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCompanies();
  }, []);

 const filteredCompanies = useMemo(() => {
  let result = allCompanies;
if (searchParams.get('hasJob') === 'true') {
  result = result.filter(company => company.hasJob === true);
}

  if (searchQuery) {
    result = result.filter(company =>
      company.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCities.length > 0) {
    result = result.filter(company =>
      selectedCities.includes(company.city)
    );
  }

  return result;
}, [allCompanies, searchQuery, selectedCities]);

const handleHasJobToggle = () => {
  const newHasJob = !hasJob;
  setHasJob(newHasJob);


  const params = new URLSearchParams(searchParams);
  if (newHasJob) {
    params.set('hasJob', 'true');
  } else {
    params.delete('hasJob');
  }``
  setSearchParams(params);
};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ page: 1, q: inputValue });
  };

  const handlePageChange = (_, value) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', value);
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { currentCompanies, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredCompanies.length / COMPANIES_PER_PAGE);
    const startIndex = (currentPage - 1) * COMPANIES_PER_PAGE;
    const endIndex = startIndex + COMPANIES_PER_PAGE;
    const currentCompanies = filteredCompanies.slice(startIndex, endIndex);
    return { currentCompanies, totalPages };
  }, [filteredCompanies, currentPage]);

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
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <>
      <OnTop />
      <div className="container py-5 min-h-[625px]">
        <div className="flex flex-col items-center">
          <p className="font-bold font-inter text-[32px] text-[var(--primary)]">
            Բացահայտիր ոլորտի առաջատարներին
          </p>
          <p className="font-extralight font-inter text-[14px] text-gray-500 pb-[15px] text-center">
            Կազմակերպություններ, որոնք ներկայումս ակտիվ են հարթակում։ 
          </p>
        </div>

        <div className="flex justify-center gap-10 mt-6 flex-col lg:flex-row ">
          <div className="w-full lg:w-[450px] bg-[var(--itemColor)] shadow-lg rounded-[8px] h-auto self-start py-5">
            <div className="p-4 ">
              <div className="flex justify-between border-b-2  pb-3 border-[var(--primary)]">
                <p className="text-[18px] font-bold">Որոնման Ֆիլտրներ</p>
                <p
                  className="text-[18px] font-bold text-[var(--primary)] cursor-pointer"
                  onClick={() => {
                    setInputValue('');
                    setSelectedCities([]); 

                    const params = new URLSearchParams(searchParams);
                    params.delete('q');    
                    params.delete('city');  
                    params.set('page', '1'); 
                    setSearchParams(params); 
                  }}
                >
                  Մաքրել Բոլորը
                </p>
              </div>
                  
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="w-full h-[60px] rounded-[8px] px-4 border border-gray-300 mt-5 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition duration-300"
                  placeholder="Որոնել կազմակերպություն..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </form>
              <FormControlLabel className='mt-3'
                control={
                  <Checkbox
                    checked={hasJob}
                    onChange={handleHasJobToggle}
                    sx={{
                      color: "#0f687e",
                      "&.Mui-checked": {
                        color: "#0f687e",
                      },
                    }}
                  />
                }
                label="Թափուր աշխատատեղեր ունեցող"
              />

               <Accordion className=' rounded-[8px]'
                sx={{
                      boxShadow: 'none',      
                      border: 'none',       
                      '&::before': {
                        display: 'none',       
                      },
                      padding:"none",
                      }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="city-checkboxes"
                  id="city-accordion"
                  sx={{
                    paddingLeft: "0 !important",
                    paddingRight: "0 !important",
                  }}
                  className='h-[60px]'
                >
                  <Typography>Քաղաքներ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)", // 2 սյուն
                      maxWidth: "600px"
                    }}
                  >
                    {cityArray.map((city, index) => {
                      const isChecked = selectedCities.includes(city);
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={() => handleToggle(city)}
                              sx={{
                                color: "#0f687e",
                                "&.Mui-checked": {
                                  color: "#0f687e"
                                }
                              }}
                            />
                          }
                          label={city}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="w-full lg:w-[800px] flex flex-col gap-5">
            <div className="w-[800px] h-[60px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
              <p className="ml-4 text-[var(--primary)] font-bold">
                Գտնվել է՝ {filteredCompanies.length} կազմակերպություն
              </p>
            </div>
            {currentCompanies.length > 0 ? (
              <>
                {currentCompanies.map((company) => {
                  const jobCount = Array.isArray(company.jobs) ? company.jobs.length : 0;
                  return (
                    <CompaniesItem
                      key={company.id}
                      id={company.id}
                      logo={`${config.BACK_URL}${company.logo}`}
                      companyName={company.title}
                      city={company.city || 'Քաղաքը նշված չէ'}
                      industry={company.industry || 'Ոլորտը նշված չէ'}
                      count={jobCount}
                    />
                  );
                })}

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
              </>
            ) : (
              <div className="bg-[var(--itemColor)] shadow-lg rounded-[8px] p-8 text-center">
                <p className="text-gray-500">Համապատասխան կազմակերպություններ չեն գտնվել</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;


