/* eslint-disable react/prop-types */
const Worker = ({avatar,fullName,city,industry,scheduleType,salary}) => {
  return (
    <div className="w-[800px] h-[100px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
        <div className='flex p-3'>
            <div className='w-[70px] h-[70px] mr-2'>
                <img src={avatar} alt={""} />
            </div>
            <div className='flex flex-col  justify-center gap-1'>
                <p className='font-bold ml-1'>{fullName}</p>
                <p className='font-medium text-[var(--primary)] ml-1'>{industry}</p>
            </div>
        </div>
        <div className='flex flex-col  justify-center'>
            <p className='font-bold'>{salary} / ամիս</p>
            <p className='font-normal text-gray-400'>{city} / {scheduleType}</p>
        </div>
        <div className="flex items-center justify-center bg-[var(--light)] mr-10 w-[150px] h-[50px] rounded-full text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--light)] transition duration-300">
            Տեսնել
        </div>
    </div>
  )
}

export default Worker