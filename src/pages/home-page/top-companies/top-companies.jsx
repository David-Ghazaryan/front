import Title from "../../../components/titles/titles";
import CompanyItem from "./company-item";
const TopCompanies = ()=>{
    return(
        <div >
            <div className="container">
                <Title text={"Թոփ ընկերությունները"}/>     
                <div className="grid grid-cols-4 place-items-center gap-[70px]"> 
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                    <CompanyItem companyName={"Digitain"} location={"Երևան"} count={10}/>
                </div>
                <div className="flex justify-center py-[20px]">
                    <a href="" className="text-[var(--primary)] text-[20px] font-normal font-inter ">տեսնել ավելին →</a>
                </div>
            </div>
        </div>
    )
}
export default TopCompanies;

