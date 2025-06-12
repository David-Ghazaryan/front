/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";
const ReviewCard = ({image,fullName,date,review,rating}) => {
    return (
      <div className="cursor-pointer bg-[var(--itemColor)] shadow-lg rounded-2xl p-6 w-[300px] h-[280px]  hover:shadow-[inset_0_0_0_2px_var(--primary)] transition duration-150">
        <div className="flex items-center ">
          <div className="w-[80px]  border-1 border-[var(--primary)] rounded-full flex items-center justify-center"> 
            <img className="w-full  rounded-full object-cover" src={image} alt="" />
            </div>
          <div className="pl-[25px]">
            <h3 className="text-lg font-semibold">{fullName}</h3>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>
        <div className="w-[96px] h-[20px] mt-[10px]">
          <Rating value={rating} readOnly/>
        </div>
        <p className="text-gray-700 text-sm pt-[10px]">
          {review}
        </p>
      </div>
    );
  };
  
  export default ReviewCard;
  