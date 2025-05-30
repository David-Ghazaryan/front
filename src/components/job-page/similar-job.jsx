/* eslint-disable react/prop-types */
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Link } from 'react-router-dom';
const SimilarJobItem = ({ companyId,jobId,logo, companyName, city, title, description, scheduleType, deadline }) => {
  return (
    <div className='w-[330px] h-[330px] bg-[var(--itemColor)] rounded-[5px]  border-1 border-gray-200'>
      <div className='flex flex-col p-4 h-full justify-between'>
        <div className='flex'>
          <div className='w-[70px] h-[70px] mr-2 overflow-hidden  bg-white border-1 border-gray-400'>
            <img
              src={logo}
              alt={companyName}
              className='w-full h-full object-contain'
            />
          </div>
          <div className='flex flex-col justify-center'>
            <Link to={`/companies/${companyId}`}>
              <p className='font-bold  pl-1  hover:underline'>{companyName}</p>
            </Link>
            <div className='flex items-center'>
              <FmdGoodOutlinedIcon sx={{ color: '#9CA3AF' }} />
              <p className='font-normal text-gray-400'>{city}</p>
            </div>
          </div>
        </div>

        <div>
          <Link to={`/job/${jobId}`}>
            <p className='py-0 font-bold text-[14px] hover:underline'>{title}</p>
          </Link>
          <p className='font-light py-2 text-gray-400 text-[14px]'>
            {description?.length > 50 ? `${description.slice(0, 50)}...` : description}
          </p>
        </div>

        <div className='h-0.5 rounded-2xl bg-[var(--primary)] w-full my-3'></div>

        <div className='flex justify-between text-[14px]'>
          <div className='flex items-center'>
            <WorkOutlineOutlinedIcon sx={{ color: '#9CA3AF', fontSize: 18 }} />
            <p className='ml-1 font-normal text-gray-500'>{scheduleType}</p>
          </div>
          <div className='flex items-center'>
            <AccessTimeOutlinedIcon sx={{ color: '#9CA3AF', fontSize: 18 }} />
            <p className='ml-1 font-medium text-gray-400'>{deadline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarJobItem;
