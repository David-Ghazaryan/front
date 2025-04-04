/* eslint-disable react/prop-types */
const ReviewCard = ({image,name,surname,date,review}) => {
    return (
      <div className="cursor-pointer bg-[var(--itemColor)] shadow-lg rounded-2xl p-6 w-[300px] h-[280px]  hover:shadow-[inset_0_0_0_2px_var(--primary)] transition duration-150">
        <div className="flex items-center ">
          <div className="w-[65px] h-[65px] "> <img src={image} alt="" /></div>
          <div className="pl-[25px]">
            <h3 className="text-lg font-semibold">{name} <br /> {surname}</h3>
            <p className="text-gray-500 text-sm">{date}</p>
          </div>
        </div>
        <div className="w-[96px] h-[20px] bg-amber-300 mt-[10px]"></div>
        <p className="text-gray-700 text-sm pt-[10px]">
          {review}
        </p>
      </div>
    );
  };
  
  export default ReviewCard;
  