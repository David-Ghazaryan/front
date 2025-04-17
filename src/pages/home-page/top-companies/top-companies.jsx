import Title from "../../../components/titles/titles";
import Skeleton from '@mui/material/Skeleton';
import  { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/public";
import CompanyItem from "./company-item";
import { Link } from "react-router-dom";
const TopCompanies = ()=>{
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
          try {
            await new Promise(resolve => setTimeout(resolve, 1000)); 
      
            const response = await axios.get(`${config.BACK_URL}/api/company`);
            setCompanies(response.data.data); 
          } catch (err) {
            setError("Չհաջողվեց բեռնել ընկերությունները");
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
      
        fetchCompanies();
      }, []);
    if (loading) {
        return( 
            <div className="container">
                <Title text={"Թոփ ընկերությունները"}/> 
                <div className=" grid grid-cols-4 place-items-center gap-[50px]">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} variant="rectangular" width={270} height={270} 
                        sx={{
                            bgcolor: '#0f687e80',    
                            animationDuration: '1s',      
                            borderRadius: '10px',
                          }} />
                    ))}
                </div>
            </div>
        )
    }
    if (error) return <p>{error}</p>;
    return(
        <div >
            <div className="container">
                <Title text={"Թոփ ընկերությունները"}/>     
                <div className="grid grid-cols-4 place-items-center gap-[50px]"> 
                {companies.slice(0, 8).map((company) => (
                    <CompanyItem 
                        key={company.id} 
                        id={company.id}
                        logo={`${config.BACK_URL}${company.logo}`}
                        companyName={company.title} 
                        location={company.location ? company.location: "Հասցեն նշված չէ"} 
                        count={company.jobs.length}
                    />
    
                    ))}
                </div>
                <div className="flex justify-center py-[20px]">
                    <p  className="text-[var(--primary)] text-[20px] font-normal font-inter ">
                        <Link to={"/companies"}> տեսնել ավելին →</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default TopCompanies;

