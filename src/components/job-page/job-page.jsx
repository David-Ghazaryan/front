import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import Groups2Icon from '@mui/icons-material/Groups2';
import CallIcon from '@mui/icons-material/Call';
import GorcUxiService from '../../services/gorcuxi_service'; 
import config from '../../config/public';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import SimilarJobItem from './similar-job';
const service = new GorcUxiService(); 

const JobPage = () => {
  const { id: jid } = useParams();
  const [job, setJob] = useState();
  const [company, setCompany] = useState();
  const [loading, setLoading] = useState(true);
  const [similarJob, setSimilarJob] = useState([]);
  const [similarCompany, setSimilarCompany] = useState([]);

  useEffect(() => {
    const fetchJobAndCompany = async () => {
      try {
        const jobRes = await service.getJob(jid); 
        setJob(jobRes);
        console.log(jobRes);
        
        const companyRes = await service.getCompany(jobRes.companyId); 
        setCompany(companyRes);

      } catch (err) {
        console.error('Սխալ տվյալները բեռնելիս:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobAndCompany();
  }, [jid]);
  useEffect(() => {
  const fetchSimilarJobs = async () => {
    try {
      if (!job) return;

      const similarJobsRes = await service.getSimilarJobs(job.industryId);
      setSimilarJob(similarJobsRes);

      const companyIds = [...new Set(similarJobsRes.map(j => j.companyId))];
      const companyPromises = companyIds.map(id => service.getCompany(id));
      const companies = await Promise.all(companyPromises);
      setSimilarCompany(companies);

    } catch (err) {
      console.error("Սխալ similar jobs բեռնելիս:", err);
    }
  };
  fetchSimilarJobs()
  },[job]);
  if (loading || !company || !job) {
    return(
      <div className='containerPage'>
        <div className='flex flex-col shadow-lg'>
          <div className='w-full h-[350px] shadow-lg z-10 bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300'>
            <Skeleton variant='rectangular' width='100%' height='100%' />
          </div>
          <div className='w-full h-[125px] bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300 flex pl-[30px]'>
            <div className='w-[150px] h-[150px] border-2 border-gray-200 transform translate-y-[-60px] bg-white z-20 flex items-center justify-center'>
              <Skeleton variant='rectangular' width={120} height={120} />
            </div>
            <div>
              <Skeleton variant='text' width={200} height={40} className='mt-10 ml-10' />
            </div>
          </div>
        </div>
  
        <div className='flex gap-5 my-5'>
          <div className='flex flex-col w-2/3 gap-5'>
            <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5'>
              <Skeleton variant='text' width={120} height={30} />
              <Skeleton variant='text' width='100%' height={20} />
              <Skeleton variant='text' width='90%' height={20} />
              <Skeleton variant='text' width='80%' height={20} />
            </div>
            <div className='bg-[var(--itemColor)] flex flex-col gap-5 rounded-2 shadow-lg p-5'>
              <Skeleton variant='text' width={200} height={30} />
              <Skeleton variant='rectangular' width='100%' height={80} />
            </div>
          </div>
  
          <div className='flex w-1/3 bg-[var(--itemColor)] p-5 rounded-5 shadow-lg'>
            <div className='flex flex-col gap-5'>
              {[...Array(5)].map((_, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <Skeleton variant='circular' width={28} height={28} />
                  <div>
                    <Skeleton variant='text' width={100} height={20} />
                    <Skeleton variant='text' width={150} height={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
    )
  }
  const companyId = job.companyId;


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
  };
  const scheduleTypes = {
    FULL_TIME: "Լրիվ դրույք",
    HALF_TIME: "Կես դրույք",
    FLEXIBLE: "Ճկուն գրաֆիկ",
    CONTRACT: "Պայմանագրային",
    TEMPORARY: "Ժամանակավոր/Սեզոնային",
    INTERNSHIP: "Ինտերնշիփ"
  };

  const levelTypes = {
  NOT_REQUIRED: "Չի պահանջվում",
  BEGINNER: "Սկսնակ",
  MIDDLE: "Միջին",
  EXPERIENCED: "Փորձառու"
};

  const {
    title = '',
    industry='',
    deadline = '',
    city = '',
    scheduleType = '',
    description = '',
    level =''
  } = job;

  


  return (
    <div className='containerPage'>
      <div className='flex flex-col shadow-lg bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300'>
        <div className='w-full h-[350px] shadow-lg z-10'>
          <img className='w-full h-full object-cover' src={`${config.BACK_URL}${company.backgroundImage}`} alt={company.title} />
        </div>
        <div className='w-full h-[125px] flex pl-[30px]'>
          <div className='w-[150px] h-[150px]  border-2 border-gray-200 transform translate-y-[-60px] z-20 bg-[var(--primary)]'>
            <img className='w-full h-full' src={`${config.BACK_URL}${company.logo}`} alt={company.title || 'Անուն'} />
          </div>
          <div className='mt-4 ml-10 flex flex-col'>
            <p className='font-bold text-3xl'>{title || 'Աշխատանքի անունը'}</p>
            <Link to={`/companies/${companyId}`}>
              <p className='text-2xl text-blue-800'>{company.title || 'Ընկերության անունը'}</p>
            </Link>
          </div>

        </div>
        <div className='grid grid-cols-2 gap-3 ml-8 mb-4'>
          <p className='text-gray-500'>Ոլորտ՝ <span className='text-black font-bold'>{industry.title}</span></p>
          <p className='text-gray-500'>Վերջնաժամկետ՝ <span className='text-black font-bold'>{formatDate(deadline)}</span></p>
          <p className='text-gray-500'>Քաղաք՝ <span className='text-black font-bold'>{city}</span></p>
          <p className='text-gray-500'>Դրույք՝ <span className='text-black font-bold'>{scheduleTypes[scheduleType]}</span></p>
          <p className='text-gray-500'>Աշխատանքային փորձ` <span className='text-black font-bold'>{levelTypes[level]}</span></p>
        </div>
      </div>
      <div className='flex gap-5 my-5'>
        <div className='flex flex-col w-2/3 gap-5'>
          <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5'>
            <p className='font-bold text-2xl mb-5'>Նկարագրություն</p>
            <p className='indent-4 text-justify'>{description || 'Աշխատանքի մասին'}</p>
          </div>
          <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5 flex flex-col gap-5'>
            <p className='font-bold text-2xl'>Ընկերության մասին</p>
            <div className='grid grid-cols-2 gap-5'>
              <div className='flex items-center gap-2'>
                <PlaceIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
                <div>
                  <p className='font-bold'>Քաղաք</p>
                  <p className='font-thin'>{city || 'Քաղաքը նշված չէ'}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Groups2Icon sx={{ fontSize: 28, color: '#d1d5dc' }} />
                <div>
                  <p className='font-bold'>Աշխատակիցների քանակ</p>
                  <p className='font-thin'>{company.minWorkes && company.maxWorkes ? `${company.minWorkes} - ${company.maxWorkes}` : 'Աշխատակիցների քանակը նշված չէ'}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <CallIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
                <div>
                  <p className='font-bold'>Հեռախոսահամար</p>
                  <p className='font-thin'>{company.phoneNumber || 'Հեռախոսահամարը նշված չէ'}</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
              <LanguageIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
                <div>
                  <p className='font-bold'>Կայք</p>
                  <a target='blank' href={company.webSite} className='font-thin text-blue-700'>{company.webSite}</a>
                </div>
              </div>
            </div>
            <p className='indent-4 text-justify'>{company.description || 'Ընկերության մասին'}</p>
          </div>
        </div>
        <div className='flex flex-col w-1/3 bg-[var(--itemColor)] self-start p-5 rounded-5 shadow-lg'>
          <p className='font-bold text-xl'> Նմանատիպ աշխատանքներ </p>
             <div className="flex items-center flex-col mt-[35px] gap-5">
              {similarJob.map((job) => {
                const company = similarCompany.find((c) => c.id === job.companyId);

                return (
                  <SimilarJobItem
                    key={job.id}
                    jobId={job.id}
                    companyId={company?.id ?? null}
                    logo={company?.logo ? `${config.BACK_URL}${company.logo}` : null}
                    companyName={company?.title ?? 'Անհայտ ընկերություն'}
                    city={job.city}
                    title={job.title}
                    description={job.description}
                    scheduleType={scheduleTypes[job.scheduleType]}
                    deadline={formatDate(job.deadline)}
                  />
                );
              })}

            </div>
        </div>
      </div>
    </div>
  );
}

export default JobPage;
