import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';
import config from '../../config/public';
import GorcUxiService from '../../services/gorcuxi_service';
import TopJob from './top-job';
import Job from './job';
import OnTop from '../../components/onTop/onTop';

const service = new GorcUxiService();

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [placeholder, setPlaceholder] = useState('');
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobData, companyData] = await Promise.all([service.getAllJobs(), service.getCompanies()]);
        setJobs(jobData);
        setCompanies(companyData);
      } catch (err) {
        setError('Չհաջողվեց բեռնել տվյալները');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const text = 'Փնտրեք աշխատանք այստեղ...';
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        if (index > text.length) {
          clearInterval(interval);
          return prev;
        }
        const next = text.slice(0, index);
        index++;
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const jobTitleMatch = job.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const company = companies.find((c) => c.id === job.companyId);
      const companyNameMatch = company?.title?.toLowerCase().includes(searchQuery.toLowerCase());
      return jobTitleMatch || companyNameMatch;
    });
  }, [jobs, companies, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

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
    setSearchParams({ page: 1, q: inputValue });
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
const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  return (
    <>
      <OnTop />
      <div className="container">
        <div className="flex justify-between my-1">
          <aside>
            <div className="mt-[85px] w-[380px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px]">
              <div className="p-4">
                <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
                  <p className="text-[18px] font-bold">Որոնման Ֆիլտրներ</p>
                  <p onClick={() => {
                    setInputValue('');
                    setSearchParams({ page: 1, q: '' });
                    }} 
                    className="text-[18px] font-bold text-[var(--primary)] cursor-pointer">Մաքրել Բոլորը
                    </p>
                </div>
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
                  placeholder={placeholder}
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
                {currentJobs.map((job) => {
                  const jobCompany = companies.find((c) => c.id === job.companyId);
                  return (
                    <Job
                      key={job.id}
                      job={job.id}
                      jobId={job.id}
                      companyId={jobCompany?.id}
                      companyName={jobCompany?.title}
                      logo={jobCompany?.logo ? `${config.BACK_URL}${jobCompany.logo}` : null}
                      city={job.city}
                      title={job.title}
                      deadline={formatDate(job.deadline)}
                      salary={job.salary}
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
                const jobCompany = companies.find((c) => c.id === job.companyId);
                return (
                  <TopJob
                    key={job.id}
                    logo={jobCompany?.logo ? `${config.BACK_URL}${jobCompany.logo}` : null}
                    companyName={jobCompany?.title}
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
