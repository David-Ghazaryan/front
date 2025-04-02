import AppMain from './home-main/home-main.jsx';
import TopCompanies from './top-companies/top-companies.jsx';
import CreateResume from './create-resume/create-resume.jsx';
import PricingItems from './pricing/pricing.jsx';
import AppReviews from './reviews/reviews.jsx';

function HomePage() {

  return (
   <div className='bg-[var(--light)]'>
    <AppMain/>
    <TopCompanies/>
    <CreateResume/>
    <PricingItems/>
    <AppReviews result={"4.5"}/>
   </div>
  )
}

export default HomePage;
