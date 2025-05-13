import { Link } from "react-router-dom";
const Notfound = () => {
  return (
   <div className="min-h-[625px] flex justify-center items-center flex-col">
    <Link to={"/"}><p className="text-[var(--primary)] font-bold text-2xl hover:text-[var(--primaryDark)] ">Գնալ սկզբնական էջ</p></Link>
    <img src="src/assets/images/404.png" alt="" className="max-h-180"/>
   </div>
   
  )
}

export default Notfound;