/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const CompaniesItem = ({id,logo,companyName,city,industry,count}) => {
  return (
    <div className="w-[800px] h-[100px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
        <div className='flex p-3'>
            <div className='w-[80px] h-[80px] mr-2 flex items-center justify-center'>
                <img src={logo} alt={companyName} />
            </div>
            <div className='flex flex-col  justify-center gap-1'>
                <Link to={`/companies/${id}`} className="font-bold ml-1 hover:underline">{companyName}</Link>
                <p className='font-medium text-[var(--primary)] ml-1'>{industry}</p>
            </div>
        </div>
        <div className="flex items-center justify-between w-[300px] h-[40px] ">
            <p className='font-normal text-gray-400'>{city}</p>
            <div className="flex items-center justify-center bg-[var(--light)] mr-10 w-[150px] h-[40px] rounded-full text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--light)] transition duration-300">
                {count} աշխատանք
            </div>
        </div>
    </div>
  )
}

export default CompaniesItem