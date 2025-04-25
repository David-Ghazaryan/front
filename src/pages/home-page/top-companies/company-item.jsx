/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const CompanyItem = ({id,companyName,logo, city, count }) => {
     return (
        <div className="w-[270px] h-[270px] bg-[var(--itemColor)] rounded-[12px]  hover:shadow-[inset_0_0_0_2px_var(--primary)] shadow-lg relative flex flex-col items-center justify-between py-6 cursor-pointer">
            <div className="absolute top-3 right-3 bg-[var(--light)] mb-[50px] px-3 py-1 rounded-[10px] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-[var(--light)] transition duration-300">
                {count} աշխատանք
            </div>
            <div className="w-[80px] mt-[30px] h-[80px] flex items-center justify-center border-1 border-gray-200"> 
                <img  src={logo} alt="company logo" />
            </div>
            <p className="text-center font-inter font-medium text-gray-800 text-lg">{companyName}</p>
            <p className="text-center text-gray-500 text-sm">{city}</p>
            <div className="flex items-center justify-center bg-[var(--light)] w-[120px] h-[35px] font-inter font-medium text-[var(--primary)] text-sm rounded-lg hover:bg-[var(--primary)] hover:text-[var(--light)] transition duration-300">
            <Link to={`/companies/${id}`}>Տեսնել ավելին</Link>
            </div>
        </div>
    );
};

export default CompanyItem;
