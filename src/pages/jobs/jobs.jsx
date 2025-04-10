import { useEffect,useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TopJob from "./top-job"
import Job from "./job"
import OnTop from '../../components/onTop/onTop';
const Jobs = () => {
    const [placeholder, setPlaceholder] = useState("");
    
        useEffect(() => {
          const text = "Փնտրեք աշխատանք այստեղ..."
          let index = 0;
      
          const interval = setInterval(() => {
            setPlaceholder(text.slice(0, index));
            index++/2;
      
            if (index > text.length) clearInterval(interval);
          }, 100); 
        }, []);
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
                                    count={10} 
                                    variant="outlined" 
                                    shape="rounded" 
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                        color: '#0f687e', 
                                        borderColor: '#0f687e',
                                        transition: 'all 0.1s ease', 
                                        },
                                        '& .Mui-selected': {
                                        backgroundColor: '#0f687e', 
                                        color: '#DCE6F6',
                                        borderColor: '#0f687e',
                                        transition: 'all 0.1s ease', 
                                    }}
                                    }
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