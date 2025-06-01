/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const Worker = ({id,avatar,fullName,city,industry,scheduleType,salary}) => {
  return (
    <div className="w-full h-[100px] mb-5 bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
        <div className='flex p-3'>
            <div className='w-20 h-20 mr-2 rounded-full  flex items-center justify-center'>
                <img className="w-20 h-20  rounded-full border-1 border-[var(--primary)] object-cover" src={avatar} alt={""} />
            </div>
            <div className='flex flex-col  justify-center gap-1'>
                <Link 
                to={`/user/${id}`} 
                className="text-[18px] font-bold text-[var(--primary)] hover:underline"
                >
          {fullName}
        </Link>
                <p className='font-medium text-[var(--primary)] ml-1'>{industry}</p>
            </div>
        </div>
        <div className='flex flex-col items-center  justify-center'>
            {salary ? <p className='font-bold'>{salary} ֏ / ամիս</p>: ''}
             <p className='font-normal text-gray-400'>{city + ' / ' || ''}  {scheduleType || ''}</p>
        </div>
        <Link to={`/user/${id}`} >
            <div className="flex items-center justify-center bg-[var(--light)] mr-10 w-[150px] h-[50px] rounded-full text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--light)] transition duration-300">
                Տեսնել
            </div>
        </Link>
    </div>
  )
}

export default Worker