import Title from "../../../components/titles/titles";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import StarRating from "./review-star";
import ReviewCard from "./review-item";
// eslint-disable-next-line react/prop-types
const AppReviews = ({ result }) => {
  let colorClass = "text-black";

  if (result >= 0 && result < 2) {
    colorClass = "text-red-500";
  } else if (result >= 2 && result < 3) {
    colorClass = "text-orange-500";
  } else if (result >= 3 && result < 4) {
    colorClass = "text-yellow-500";
  } else if (result >= 4 && result <= 5) {
    colorClass = "text-green-600";
  }
  return (
    <div className="mb-[100px]">
      <div className="container">
            <Title  text={"Կարծիքներ"} />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <p className={`font-bold text-[48px] ${colorClass}`}>{result}</p>
                    <StarRating value={`${result}`}/>
                    <p className="text-black text-[16px]">Ավելի քան 50 կարծիք</p>
                </div>
                <div className="w-[220px] h-[60px] bg-[var(--primary)] flex items-center justify-center gap-2 px-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition">
                    <ModeEditOutlineOutlinedIcon fontSize="medium" className="text-white" />
                    <p className="text-white text-[20px]">Գրել կարծիք</p>
                </div>
            </div> 
            <div className="grid grid-cols-4 gap-[50px] mt-[50px]">
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            <ReviewCard image={"src/assets/images/user-image.png"} name={"David"} surname={"Ghazaryan"} date={"3 monts ago"} review={" So good website"}/>
            </div> 
      </div>
    </div>
  );
};

export default AppReviews;
