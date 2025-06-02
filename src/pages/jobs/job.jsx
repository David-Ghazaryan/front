/* eslint-disable react/prop-types */
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Link } from "react-router-dom";
const Job = ({logo,jobId,companyId,companyName,city,title,deadline,salary,scheduleType}) => {
     return (
    <div className="w-full min-h-[100px] bg-[var(--itemColor)]   rounded-[5px] shadow-lg mt-5">
        <div className='flex p-3 '>
            <div className='w-[80px] h-[80px] mr-2 flex items-center justify-center'>
                <img className='  object-contain' src={logo} alt={companyName} />
            </div>
            <div className='flex flex-col '>
                <Link to={`/job/${jobId}`}>
                    <p className='font-bold hover:underline  ml-1 gap-1'>{title}</p>
                </Link>
                <Link to={`/companies/${companyId}`}>
                    <p className='font-medium text-gray-400 ml-1 hover:underline'>{companyName}</p>
                </Link>
                <div className='flex gap-5 pt-1'>
                    {city ? 
                    <div className='flex gap-1'>
                        <FmdGoodOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                        <p className='font-normal text-gray-400'>{city}</p>
                    </div>:""}
                    {deadline ? 
                    <div className='flex gap-1'>
                        <AccessTimeOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                        <p className='font-normal text-gray-400'>{deadline}</p>
                    </div>:""}
                    {salary ?
                    <div className='flex gap-1'>
                        <LocalAtmOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                        <p className='font-normal text-gray-400'>{salary} Դրամ</p>
                    </div>:""}
                    {scheduleType ?
                    <div className='flex gap-1'>
                        <WorkOutlineOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                        <p className='font-normal text-gray-400'>{scheduleType}</p>
                    </div>:""}
                </div>
            </div>
        </div>
    </div>
   )
 }
 
 export default Job