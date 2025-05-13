import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppMain = () => {
  const [placeholder, setPlaceholder] = useState("");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const text = "Փնտրեք լավագույնը այստեղ...";
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(text.slice(0, index));
      index++;

      if (index > text.length) clearInterval(interval);
    }, 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(inputValue)}&page=1`);
    }
  };

  return (
    <div className="bg-[var(--primary)] w-full h-[625px] flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src="src/assets/images/main-photo.png" alt="Main visual" />
          </div>
          <div className="text-end">
            <div className="font-bold text-[48px] font-inter text-white mb-[20px]">
              Աշխատանք <br /> ամբողջ Հայաստանի <br /> Հանրապետությունում
            </div>
            <div className="font-normal text-[14px] font-inter text-[#CFC9C9] mb-[20px]">
              Ձեր կարիերան սկսվում է այստեղ։ Գտեք լավագույն աշխատանքները, <br />
              որոնք համապատասխանում են ձեր հմտություններին և հետաքրքրություններին։
            </div>
            <form onSubmit={handleSubmit} >
              <input
                type="text"
                className="w-[450px] h-[50px] rounded-[12px] px-4 border border-gray-300 bg-white 
                           focus:outline-none focus:ring-2 focus:ring-[var(--light)]  
                           focus:backdrop-blur-lg transition duration-300 input-animate" 
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppMain;
