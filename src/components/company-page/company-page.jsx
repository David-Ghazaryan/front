import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/public';
import { Link } from 'react-router-dom';
import GorcUxiService from '../../services/gorcuxi_service';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import Groups2Icon from '@mui/icons-material/Groups2';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import { Skeleton } from '@mui/material';

const service = new GorcUxiService();
const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // loading skeleton-ի էֆեկտի համար
        
        const companyData = await service.getCompany(id); // այստեղ ստանում ես քո ֆորմատավորված տվյալը
        setCompany(companyData);
      } catch (error) {
        console.error("Error loading company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return(
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
  if (!company) return <p>Չհաջողվեց բեռնել տվյալները։</p>;
  const {
    title,
    mail,
    logo,
    backgroundImage,
    phoneNumber,
    minWorkes,
    maxWorkes,
    description,
    location,
    // city,
    webSite,
    // jobs = [],
  } = company;
  return (
    <div className='containerPage '>
      <div className='flex flex-col shadow-lg'>
        <div className='w-full h-[350px] shadow-lg z-10 bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300'>
          <img className='w-full h-full object-cover' src={`${config.BACK_URL}${backgroundImage}`} alt={title} />
        </div>
        <div className='w-full h-[125px] bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300 flex pl-[30px]'>
          <div className='w-[150px] h-[150px] border-2 border-gray-200 transform translate-y-[-60px] bg-white z-20 flex items-center justify-center'>
            <img className='w-[150px] object-contain' src={`${config.BACK_URL}${logo}`} alt={title || 'Անուն'} />
          </div>
          <div>
            <p className='mt-10 ml-10 font-bold text-4xl'>{title || 'Ընկերության անունը'}</p>
          </div>
        </div>
      </div>

      <div className='flex gap-5 my-5'>
        <div className='flex flex-col w-2/3 gap-5'>
        {description &&
          <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5 '>
            <p className='font-bold text-2xl'>Մեր մասին</p>
            <p className='indent-3 text-justify'>{description}</p>
          </div>
          }
          <div className='bg-[var(--itemColor)] flex flex-col gap-3 rounded-2 shadow-lg p-5'>
            <p className='font-bold'> Աշխատանք {title || 'Ընկերություն'}-ում</p>
            
          {company.jobs && company.jobs.length > 0 ? (
            company.jobs.map((job, index) => {
              const createdAt = new Date(job.createdAt);
              const deadline = new Date(createdAt.setDate(createdAt.getDate() + 30));
              const formattedDeadline = deadline.toISOString().split('T')[0].split('-').reverse().join('.'); // օրինակ 14.05.2025

              return (
                <div key={index} className="flex items-center gap-4 p-2 text-black">
                  <img
                    src={`${config.BACK_URL}${company.logo}`}
                    alt="Company Logo"
                    className="w-16 h-16 object-contain border-1 border-gray-300"
                  />
                  <div className="flex flex-col">
                    <Link to={`/job/${job.id}`} className="text-blue-800  hover:underline">
                      {job.title}
                    </Link>
                    <p className="text-sm text-gray-600">վերջնաժամկետ՝ <span className="text-black font-bold"> {formattedDeadline} </span></p>
                    <p className="flex items-center text-sm  text-gray-600">
                      <PlaceOutlinedIcon sx={{ fontSize: 18 }} /> {job.city || 'Քաղաքը նշված չէ'}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">Այս պահին այս ընկերությունը աշխատանքներ չունի։</p>
          )}
          </div>    

        </div>

        <div className='flex w-1/3 self-start bg-[var(--itemColor)] p-5 rounded-5 shadow-lg '>
          <div className='flex flex-col gap-5 '>
            {location && 
            <div className='flex items-center gap-2'>
              <PlaceIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Հասցե</p>
                <p className='font-thin'>{location || 'Հասցեն նշված չէ'}</p>
              </div>
            </div>
            }
            { !(minWorkes <= 0 && maxWorkes <= 0) && (
            <div className='flex items-center gap-2'>
              <Groups2Icon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Աշխատակիցների քանակ</p>
                <p className='font-thin'>
                  {maxWorkes >= 1000 ? '1000+' : `${minWorkes} - ${maxWorkes}`}
                </p>
              </div>
            </div>
            )}
            {phoneNumber &&
            <div className='flex items-center gap-2'>
              <CallIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Հեռախոսահամար</p>
                <p className='font-thin'>{phoneNumber || 'Հեռախոսահամարը նշված չէ'}</p>
              </div>
            </div>
            }
            {webSite &&
            <div className='flex items-center gap-2'>
              <LanguageIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Կայք</p>
                <a href={webSite} target='_blank' rel='noopener noreferrer' className='text-blue-700 underline'>{webSite || 'Ոլորտը նշված չէ'}</a>
              </div>
            </div>
            }
            {mail &&
            <div className='flex items-center gap-2'>
              <EmailIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold '>Էլ․ փոստ</p>
                <p className='font-thin '>{mail || 'Էլ․ փոստը նշված չէ'}</p>
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
