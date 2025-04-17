/* eslint-disable react/prop-types */
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const TopJob = ({logo,companyName,city,title,description,scheduleType,deadline}) => {
    return (
    <div className='w-[270px] h-[270px] bg-[var(--itemColor)]  rounded-[5px] shadow-lg '>
        <div className='flex flex-col p-4'>
            <div className='flex'>
                <div className='w-[70px] h-[70px] mr-2'>
                    <img src={logo} alt={companyName} />
                </div>
                <div className='flex flex-col'>
                    <p className='font-bold pl-1'>{companyName}</p>
                    <div className='flex'>
                        <FmdGoodOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                        <p className='font-normal text-gray-400'>{city}</p>
                    </div>
                </div>
            </div>
            <p className='py-2 font-bold'>{title}</p>
            {/* description: job.description ? `${job.description.slice(0, 100)}...` : 'Աշխատանքը չունի նկարագրություն', */}
            <p className='font-light text-gray-400'>{description}</p>
            <div className='h-0.5 rounded-2xl bg-[var(--primary)] w-[240px] my-5'></div>
            <div className='flex justify-between'>
                <div className='flex'>
                    <WorkOutlineOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                    <p className='font-normal text-gray-500' >{scheduleType}</p>
                </div>
                <div className='flex'>
                    <AccessTimeOutlinedIcon sx={{ color: '#9CA3AF' }}/>
                    <p className='font-medium text-gray-400'>{deadline}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopJob