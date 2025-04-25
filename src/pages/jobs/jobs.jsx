import { useEffect,useState } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Skeleton } from '@mui/material';

import config from '../../config/public';
import axios from 'axios';
import TopJob from "./top-job"
import Job from "./job"
import OnTop from '../../components/onTop/onTop';
const Jobs = () => {
    const [placeholder, setPlaceholder] = useState("");
    const [, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchJobs = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get(`${config.BACK_URL}/api/company`);
            setJobs(response.data.data);
          } catch (err) {
            setError("Չհաջողվեց բեռնել ընկերությունները");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchJobs();
      }, []);

    useEffect(() => {
    const text = "Փնտրեք աշխատանք այստեղ..."
    let index = 0;

    const interval = setInterval(() => {
        setPlaceholder(text.slice(0, index));
        index++/2;

        if (index > text.length) clearInterval(interval);
    }, 100); 
    }, []);
    if(loading) return (
        (
            <div className="container">
              <div className="flex justify-between gap-4 my-1">
                {/* Left Filter Panel Skeleton */}
                <aside>
                  <div className="mt-[85px] w-[380px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px] p-4">
                    <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
                      <Skeleton width={120} height={25} />
                      <Skeleton width={90} height={25} />
                    </div>
                    <Skeleton
                      variant="rounded"
                      width={350}
                      height={60}
                      className="mt-5"
                    />
                  </div>
                </aside>
        
                {/* Main Section Skeleton */}
                <main>
                  <div className="w-[700px]">
                    <div className="mb-2">
                      <Skeleton width={300} height={40} />
                    </div>
                    <div className="mb-4">
                      <Skeleton width={200} height={20} />
                    </div>
        
                    {/* Search bar skeleton */}
                    <div className="flex justify-evenly items-center w-full min-h-[80px] bg-[var(--itemColor)] rounded-[5px] shadow-lg mb-4">
                      <Skeleton variant="rounded" width={450} height={50} />
                      <Skeleton variant="rounded" width={150} height={50} />
                    </div>
        
                    {/* Job list skeletons */}
                    <div className="flex flex-col gap-4">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="p-4 bg-[var(--itemColor)] rounded-[8px] shadow-lg">
                          <Skeleton width="40%" height={25} />
                          <Skeleton width="30%" height={20} />
                          <Skeleton width="50%" height={20} />
                        </div>
                      ))}
                    </div>
        
                    {/* Pagination Skeleton */}
                    <div className="flex items-center justify-center my-5">
                      <Skeleton variant="rounded" width={200} height={40} />
                    </div>
                  </div>
                </main>
        
                {/* Right Sidebar Skeleton */}
                <aside>
                  <div className="pt-5 text-center">
                    <Skeleton width={180} height={30} className="mx-auto" />
                  </div>
                  <div className="flex flex-col mt-[35px] gap-5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[300px] h-[100px] p-4 bg-[var(--itemColor)] shadow-lg rounded-[8px]"
                      >
                        <Skeleton variant="rectangular" width="100%" height={80} />
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>)
    )
    if (error) return <p>error</p>;
  return (
    <>
        <OnTop/>
        <div className="container">
            <div className='flex justify-between my-1'>
                <aside>
                <div className="mt-[85px] w-[380px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px]">
                    <div className='p-4'>
                        <div className=' flex justify-between border-b-2 pb-3 border-[var(--primary)]'>
                            <p className=' text-[18px] font-bold'>
                                Որոնման Ֆիլտրներ
                            </p>
                            <p className=' text-[18px] font-bold text-[var(--primary)]'>
                                Մաքրել Բոլորը
                            </p>
                        </div>
                        <input 
                            type="text" 
                            className="w-[350px] h-[60px] rounded-[8px] px-4 border border-gray-300  mt-5
                                        focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:white
                                        focus:backdrop-white transition duration-300 input-animate" 
                            placeholder={placeholder}
                            />
                    </div>
                </div>
                </aside>
                <main>
                    <div className="w-[700px]">
                        <p className="font-bold font-inter text-[32px] text-[var(--primary)] ">Թափուր աշխատատեղեր</p>
                        <p className="font-extralight font-inter text-[14px] text-gray-500 2 pb-[15px]">Աշխատանքային հայտարարություններ</p>
                        <div className="flex justify-evenly items-center w-full min-h-[80px] bg-[var(--itemColor)]  rounded-[5px] shadow-lg">
                            <input 
                                type="text" 
                                className="w-[450px] h-[50px] rounded-[8px] px-4 border border-gray-300  
                                            focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:white
                                            focus:backdrop-white transition duration-300 input-animate" 
                                placeholder={placeholder}
                                />
                            <a href="">
                                <div className='h-[50px] w-[150px] bg-[var(--primary)] flex items-center justify-center rounded-[8px] hover:shadow-lg   '>
                                    <p className='text-[var(--light)]'>
                                        Փնտրել
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className='flex flex-col '>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025' salary={"160.000 Դրամ"}/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025'/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025' salary={"160.000 Դրամ"}/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025'/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025' salary={"160.000 Դրամ"}/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025'/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025' salary={"160.000 Դրամ"}/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025'/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025' salary={"160.000 Դրամ"}/>
                            <Job companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող'deadline='20.04.2025'/>
                            <Stack className='my-5 flex items-center justify-center'>
                                <Pagination 
                                    count={3} 
                                    variant="outlined" 
                                    shape="rounded" 
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                          borderColor: '#0f687e !important',
                                          color: '#0f687e !important',
                                          transition: 'all 0.1s ease !important',
                                        },
                                        '& .Mui-selected': {
                                          backgroundColor: '#0f687e !important',
                                          color: '#DCE6F6 !important',
                                          borderColor: '#0f687e !important',
                                          transition: 'all 0.1s ease !important',
                                        },
                                      }}
                                />
                            </Stack>
                        </div>
                    </div>
                </main>
                <aside>
                    <p className="font-bold font-inter text-center text-[20px] text-[var(--primary)] pt-5 ">Թոփ աշխատանքներ</p>
                    <div className="flex flex-col mt-[35px] gap-5">
                        <TopJob logo='' companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող' description='Մեզ անհրաժեշտ է փորձառու FrontEnd ծրագրավորող․․․' scheduleType='Լրիվ դրույք' deadline='20.04.2025'/>
                        <TopJob logo='' companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող' description='Մեզ անհրաժեշտ է փորձառու FrontEnd ծրագրավորող․․․' scheduleType='Լրիվ դրույք' deadline='20.04.2025'/>
                        <TopJob logo='' companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող' description='Մեզ անհրաժեշտ է փորձառու FrontEnd ծրագրավորող․․․' scheduleType='Լրիվ դրույք' deadline='20.04.2025'/>
                        <TopJob logo='' companyName='Digitain' city='Երևան' title='FrontEnd Ծրագրավորող' description='Մեզ անհրաժեշտ է փորձառու FrontEnd ծրագրավորող․․․' scheduleType='Լրիվ դրույք' deadline='20.04.2025'/>
                    </div>
                </aside>
            </div>
        </div>
    </>
  )
}

export default Jobs