import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/public';

import PlaceIcon from '@mui/icons-material/Place';
import Groups2Icon from '@mui/icons-material/Groups2';
import CallIcon from '@mui/icons-material/Call';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';

const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${config.BACK_URL}/api/company/${id}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error loading company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) return <p>Բեռնվում է...</p>;
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
    industry
  } = company;

  return (
    <div className='containerPage '>
      <div className='flex flex-col shadow-lg'>
        <div className='w-full h-[350px] shadow-lg z-10 bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300'>
          <img className='w-full h-full' src={`${config.BACK_URL}${backgroundImage}`} alt={title} />
        </div>
        <div className='w-full h-[125px] bg-[var(--itemColor)] border-x-1 border-b-1 border-gray-300 flex pl-[30px]'>
          <div className='w-[150px] h-[150px] border-1 border-gray-200 transform translate-y-[-60px] bg-white z-20 flex items-center justify-center'>
            <img className='w-[150px]   bg-cover' src={`${config.BACK_URL}${logo}`} alt={title || 'Անուն'} />
          </div>
          <div>
            <p className='mt-10 ml-10 font-bold text-4xl'>{title || 'Ընկերության անունը'}</p>
          </div>
        </div>
      </div>

      <div className='flex gap-5 my-5'>
        <div className='flex flex-col w-2/3 gap-5'>
          <div className='bg-[var(--itemColor)] rounded-2 shadow-lg p-5 '>
            <p className='font-bold text-2xl'>Մեր մասին</p>
            <p className='indent-4'>{description || 'Ընկերության մասին'}</p>
          </div>
          <div className='bg-[var(--itemColor)] flex flex-col gap-5 rounded-2 shadow-lg p-5'>
            <p className='font-bold'> Աշխատանք {title || 'Ընկերություն'}-ում</p>
            {/* Աշխատանքների ցանկը կգա այստեղ */}
          </div>
        </div>

        <div className='flex w-1/3 bg-[var(--itemColor)] p-5 rounded-5 shadow-lg'>
          <div className='flex flex-col gap-5 '>
            <div className='flex items-center gap-2'>
              <PlaceIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Հասցե</p>
                <p className='font-thin'>{location || 'Հասցեն նշված չէ'}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Groups2Icon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Աշխատակիցների քանակ</p>
                <p className='font-thin'>
                  {minWorkes && maxWorkes
                    ? maxWorkes >= 1000
                      ? '1000+'
                      : `${minWorkes} - ${maxWorkes}`
                    : 'Աշխատակիցների քանակը նշված չէ'}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <CallIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Հեռախոսահամար</p>
                <p className='font-thin'>{phoneNumber || 'Հեռախոսահամարը նշված չէ'}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <BusinessCenterIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold'>Ոլորտ</p>
                <p className='font-thin'>{industry || 'Ոլորտը նշված չէ'}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <EmailIcon sx={{ fontSize: 28, color: '#d1d5dc' }} />
              <div>
                <p className='font-bold '>Էլ․ փոստ</p>
                <p className='font-thin '>{mail || 'Էլ․ փոստը նշված չէ'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
