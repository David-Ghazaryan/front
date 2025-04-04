/* eslint-disable react/prop-types */
import { useEffect,useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CompaniesItem from "./companies-item"
const Companies = ({companyCount=5}) => {
    const [placeholder, setPlaceholder] = useState("");
    
    useEffect(() => {
      const text = "Որոնել..."
      let index = 0;
  
      const interval = setInterval(() => {
        setPlaceholder(text.slice(0, index));
        index++/2;
  
        if (index > text.length) clearInterval(interval);
      }, 100); 
    }, []);
  return (
    <div className="container ">
        <div className=" flex flex-col items-center">
            <p className="font-bold font-inter text-[32px] text-[var(--primary)] ">Բացահայտիր ոլորտի առաջատարներին</p>
            <p className="font-extralight font-inter text-[14px] text-gray-500 2 pb-[15px] text-center">Կազմակերպություններ, որոնք ներկայումս ակտիվ են հարթակում։ <br /> Տես նրանց պրոֆիլները և ընթացիկ հայտարարությունները։</p>
                   
        </div>
        <div className="flex justify-center gap-10">
            <div className=" w-[450px] h-[500px] bg-[var(--itemColor)] shadow-lg rounded-[8px]">
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
                            className="w-[420px] h-[60px] rounded-[8px] px-4 border border-gray-300  mt-5
                                        focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:white
                                        focus:backdrop-white transition duration-300 input-animate" 
                            placeholder={placeholder}
                            />
                </div>
            </div>
            <div className="flex flex-col gap-5 ">
                <div className="w-[800px] h-[60px] bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between">
                   <p className="ml-4 text-[var(--primary)] font-bold">
                        Գտնվել է` {companyCount} կազմակերպություն
                    </p>
                </div>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
                <CompaniesItem companyName={'Digitain'} city={'Երևան'} industry={"Development"} count={"10"}/>
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
    </div>
  )
}

export default Companies