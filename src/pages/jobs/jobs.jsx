import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
import config from '../../config/public';
import GorcUxiService from '../../services/gorcuxi_service';
import TopJob from './top-job';
import Job from './job';
import OnTop from '../../components/onTop/onTop';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
const levelTypes = {
  NOT_REQUIRED: "Չի պահանջվում",
  BEGINNER: "Սկսնակ",
  MIDDLE: "Միջին",
  EXPERIENCED: "Փորձառու",
};
const service = new GorcUxiService();

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(inputValue, 500);
  const [jobs, setJobs] = useState([]);
  const [randomJobs, setRandomJobs] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(false);
  const [isForStudents, setIsForStudents] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
       (async () => {
         const industry = await service.getAllIndusty();
        setIndustryData(industry);
       })()
      }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data, pagination} = await service.getAllJobs({
          q: debouncedSearch,
          page: currentPage,
          limit: 5,
          levels: selectedLevels,
          industryIds: selectedIndustries,
          selectedSalary: selectedSalary,
          allowStudents: isForStudents,
          cities: selectedCities,
          scheduleTypes: selectedSchedule
        });

        const {data: randomData} = await service.getAllJobs({
          q: debouncedSearch,
          page: currentPage,
          limit: 5,
          levels: selectedLevels,
          industryIds: selectedIndustries,
          selectedSalary: selectedSalary,
          allowStudents: isForStudents,
          cities: selectedCities,
          scheduleTypes: selectedSchedule
        });


        setJobs(data);
        setRandomJobs(randomData)
        setTotalPages(pagination.total)
      } catch {
        setError('Չհաջողվեց բեռնել տվյալները');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch, currentPage, selectedLevels, selectedIndustries, selectedSalary, isForStudents, selectedCities, selectedSchedule]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};
const handleToggleSalaryStudent = (filterType) => {
  if (filterType === 'salary') {
    setSelectedSalary(!selectedSalary);
  } else if (filterType === 'students') {
    setIsForStudents(!isForStudents);
  }
};
const handleToggleIndustry = (industryId) => {
  const newSelectedIndustries = selectedIndustries.includes(industryId) ? [] : [industryId];
  setSelectedIndustries(newSelectedIndustries);

  const newParams = new URLSearchParams(searchParams);
  newParams.delete('industry');
  if (newSelectedIndustries.length) {
    newParams.append('industry', newSelectedIndustries[0]);
  }
  setSearchParams(newParams);
};
const handleScheduleToggle = (schedule) => {
  const newParams = new URLSearchParams();

  if (selectedSchedule === schedule) {
    setSelectedSchedule('');
  } else {
    setSelectedSchedule(schedule);
    newParams.set('schedule', schedule);
  }
  newParams.set('page', '1');
  if (searchQuery) newParams.set('q', searchQuery);
  Array.from(new Set(selectedCities)).forEach((city) => newParams.append('city', city));
  setSearchParams(newParams);
};
// eslint-disable-next-line no-unused-vars
const [selectedCity, setSelectedCity] = useState(() => {
  return searchParams.get('city') || '';
});

const handleToggleLevel = (levelKey) => {
  let newSelectedLevels;
  if (selectedLevels.includes(levelKey)) {
    newSelectedLevels = selectedLevels.filter((level) => level !== levelKey);
  } else {
    newSelectedLevels = [...selectedLevels, levelKey];
  }
  setSelectedLevels(newSelectedLevels);

  const newParams = new URLSearchParams(searchParams);
  newParams.delete('level');
  newSelectedLevels.forEach(level => newParams.append('level', level));
  setSearchParams(newParams);
};

const handleToggle = (city) => {
  let newSelectedCities;

  if (selectedCities.includes(city)) {
    newSelectedCities = selectedCities.filter((c) => c !== city);
  } else {
    newSelectedCities = [...selectedCities, city];
  }
  setSelectedCities(newSelectedCities);

  const newParams = new URLSearchParams();

  newSelectedCities.forEach((c) => newParams.append('city', c));

  if (searchQuery) newParams.set('q', searchQuery);
  if (selectedSchedule) newParams.set('schedule', selectedSchedule);
  newParams.set('page', '1');

  setSearchParams(newParams);
};

  const scheduleTypes = {
    FULL_TIME: 'Լրիվ դրույք',
    HALF_TIME: 'Կես դրույք',
    FLEXIBLE: 'Ճկուն գրաֆիկ',
    CONTRACT: 'Պայմանագրային',
    TEMPORARY: 'Ժամանակավոր/Սեզոնային',
    INTERNSHIP: 'Ինտերնշիփ',
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams();
    if (inputValue) newParams.set('q', inputValue);
    newParams.set('page', '1');
    selectedCities.forEach(city => newParams.append('city', city));
    setSearchParams(newParams);
  };

  const handlePageChange = (_, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', value);
      return newParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 if (loading) {
    return (
      <div className="container">
        <div className="flex justify-between gap-4 my-1">
          <aside>
            <div className="mt-[85px] w-[380px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px] p-4">
              <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
                <Skeleton width={120} height={25} />
                <Skeleton width={90} height={25} />
              </div>
              <Skeleton variant="rounded" width={350} height={60} className="mt-5" />
            </div>
          </aside>
          <main>
            <div className="w-[700px]">
              <Skeleton width={300} height={40} className="mb-2" />
              <Skeleton width={200} height={20} className="mb-4" />
              <div className="flex justify-evenly items-center w-full min-h-[80px] bg-[var(--itemColor)] rounded-[5px] shadow-lg mb-4">
                <Skeleton variant="rounded" width={450} height={50} />
                <Skeleton variant="rounded" width={150} height={50} />
              </div>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="p-4 bg-[var(--itemColor)] rounded-[8px] shadow-lg">
                    <Skeleton width="40%" height={25} />
                    <Skeleton width="30%" height={20} />
                    <Skeleton width="50%" height={20} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center my-5">
                <Skeleton variant="rounded" width={200} height={40} />
              </div>
            </div>
          </main>
          <aside>
            <div className="pt-5 text-center">
              <Skeleton width={180} height={30} className="mx-auto" />
            </div>
            <div className="flex flex-col mt-[35px] gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-[300px] h-[100px] p-4 bg-[var(--itemColor)] shadow-lg rounded-[8px]">
                  <Skeleton variant="rectangular" width="100%" height={80} />
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
      <OnTop />
      <div className="container">
        <div className="flex justify-between my-1">
          <aside>
            <div className="mt-[85px] w-[380px] bg-[var(--itemColor)] shadow-lg rounded-[8px]">
              <div className="p-4">
                <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
                  <p className="text-[18px] font-bold">Որոնման Ֆիլտրներ</p>
                  <p onClick={() => {
                    setInputValue('');
                    setSelectedCities([]);
                    setSelectedCity('');
                    setSelectedLevels([]);
                    setSelectedSchedule('');
                    setSelectedIndustries([]);
                    setSelectedSalary(false);
                    setIsForStudents(false);
                    setSearchParams(new URLSearchParams({ page: '1' }));
                  }}
                  className="text-[18px] font-bold text-[var(--primary)] cursor-pointer">
                    Մաքրել բոլորը
                  </p>
                </div>
                {/* Ոլորտի ֆիլտր */}
                <Accordion 
                  className="mt-5 rounded-[8px]"
                  sx={{
                    boxShadow: 'none',
                    border: 'none',
                    '&::before': {
                      display: 'none',
                    },
                  }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="industry-checkboxes"
                    id="industry-accordion"
                    className="h-[10px]"
                    sx={{
                      paddingLeft: "0 !important",
                      paddingRight: "0 !important",
                    }}
                  >
                    <Typography>Ոլորտ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        maxWidth: '600px',
                      }}
                    >
                      {industryData.map((industry, index) => {
                        const isChecked = selectedIndustries.includes(industry.id); 
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                checked={isChecked}
                                onChange={() => handleToggleIndustry(industry.id)} 
                                sx={{
                                  color: '#0f687e',
                                  '&.Mui-checked': {
                                    color: '#0f687e',
                                  },
                                }}
                              />
                            }
                            label={industry.title}
                          />
                        );
                      })}


                    </Box>
                  </AccordionDetails>
                </Accordion>
                {/* city */}
                <Accordion 
                  className=" rounded-[8px] "
                  sx={{
                      boxShadow: 'none',       
                      border: 'none',        
                      '&::before': {
                        display: 'none',       
                      },}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="city-checkboxes"
                    id="city-accordion"
                    className="h-[10px]"
                    sx={{
                      paddingLeft: "0 !important",
                      paddingRight: "0 !important",
                    }}
                  >
                    <Typography>Քաղաքներ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        maxWidth: '600px',
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
                                  color: '#0f687e',
                                  '&.Mui-checked': {
                                    color: '#0f687e',
                                  },
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
                {/* scheduleType */}
                <Accordion 
                className="mt-1 rounded-[8px]"
                 sx={{
                      boxShadow: 'none', 
                      border: 'none',    
                      '&::before': {
                        display: 'none',     
                      },}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="schedule-checkboxes"
                  id="schedule-accordion"
                  className="h-[10px]"
                  sx={{
                      paddingLeft: "0 !important",
                      paddingRight: "0 !important",
                    }}
                >
                <Typography>Դրույք</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 1,
                      gridTemplateColumns: 'repeat(1, 1fr)',
                      maxWidth: '600px',
                    }}
                  >
                    {Object.entries(scheduleTypes).map(([key, label], index) => {
                      const isChecked = selectedSchedule === key;

                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={() => handleScheduleToggle(key)}
                              sx={{
                                color: '#0f687e',
                                '&.Mui-checked': {
                                  color: '#0f687e',
                                },
                              }}
                            />
                          }
                          label={label}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
                </Accordion>
                {/* level */}
                <Accordion 
                className="mt-1 rounded-[8px]"
                 sx={{
                      boxShadow: 'none', 
                      border: 'none',    
                      '&::before': {
                        display: 'none',     
                      },}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="level-checkboxes"
                  id="level-accordion"
                  className="h-[10px]"
                  sx={{
                      paddingLeft: "0 !important",
                      paddingRight: "0 !important",
                    }}
                >
                  <Typography>Աշխատանքային փորձ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1,
                      gridTemplateColumns: "repeat(1, 1fr)",
                      maxWidth: "600px",
                    }}
                  >
                    {Object.entries(levelTypes).map(([key, label]) => {
                      const isChecked = selectedLevels.includes(key);
                      return (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={() => handleToggleLevel(key)}
                              sx={{
                                color: "#0f687e",
                                "&.Mui-checked": {
                                  color: "#0f687e",
                                },
                              }}
                            />
                          }
                          label={label}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
                </Accordion>
                {/*other */}
                <Accordion
                 className="mt-1 rounded-[8px]" sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />} 
                  aria-controls="salary-student-checkboxes" 
                  id="salary-student-accordion"
                  sx={{
                      paddingLeft: "0 !important",
                      paddingRight: "0 !important",
                    }}>
                    
                  <Typography>Այլ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "repeat(1, 1fr)", maxWidth: "600px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedSalary}
                          onChange={() => handleToggleSalaryStudent('salary')}
                          sx={{ color: "#0f687e", "&.Mui-checked": { color: "#0f687e" } }}
                        />
                      }
                      label="Աշխատավարձը նշված է"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isForStudents}
                          onChange={() => handleToggleSalaryStudent('students')}
                          sx={{ color: "#0f687e", "&.Mui-checked": { color: "#0f687e" } }}
                        />
                      }
                      label="Ուսանողների համար"
                    />
                  </Box>
                </AccordionDetails>
                </Accordion>


              </div>
            </div>
          </aside>

          <main>
            <div className="w-[700px]">
              <p className="font-bold text-[32px] text-center text-[var(--primary)]">Թափուր աշխատատեղեր</p>
              <p className="font-extralight text-center text-[14px] text-gray-500 pb-[15px]">Աշխատանքային հայտարարություններ</p>

              <form onSubmit={handleSearchSubmit} className="flex justify-evenly items-center w-full min-h-[80px] bg-[var(--itemColor)] rounded-[5px] shadow-lg">
                <input
                  type="text"
                  className="w-[450px] h-[50px] rounded-[8px] px-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition duration-300 input-animate"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="h-[50px] w-[150px] bg-[var(--primary)] flex items-center justify-center rounded-[8px] hover:shadow-lg cursor-pointer"
                >
                  <p className="text-[var(--light)]">Փնտրել</p>
                </button>
              </form>

              <div className="flex flex-col">
                {randomJobs.map((job) => {
                  return (
                    <Job
                      key={job.id}
                      job={job.id}
                      jobId={job.id}
                      companyId={job.companyId}
                      companyName={job.company.title}
                      logo={job.company.logo ? `${config.BACK_URL}${job.companylogo}` : null}
                      city={job.city}
                      title={job.title}
                      deadline={formatDate(job.deadline)}
                      salary={job.salary}
                      scheduleType={scheduleTypes[job.scheduleType]}
                      levelTypes={levelTypes[job.level]}
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
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#0f687e !important',
                          color: '#DCE6F6 !important',
                          borderColor: '#0f687e !important',
                        },
                      }}
                    />
                  </Stack>
                )}
              </div>
            </div>
          </main>

          <aside>
            <p className="font-bold font-inter text-center text-[20px] text-[var(--primary)] pt-5">Թոփ աշխատանքներ</p>
            <div className="flex flex-col mt-[35px] gap-5">
              {jobs.map((job) => {
                return (
                  <TopJob
                    key={job.id}
                    jobId={job.id}
                    companyId={job.company.id}
                    logo={job.company.logo ? `${config.BACK_URL}${job.company.logo}` : null}
                    companyName={job.company.title}
                    city={job.city}
                    title={job.title}
                    description={job.description}
                    scheduleType={scheduleTypes[job.scheduleType]}
                    deadline={formatDate(job.deadline)}
                  />
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Jobs;
