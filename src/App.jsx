import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from './pages/home-page/home-page';
import Notfound from "./pages/not-found/notfound";
import ResumeBuilder from "./pages/resume/resume";
import ScrollToTop from "./components/scroll-top/scroll-top";
import AboutUs from "./pages/about-us/about";
import Jobs from "./pages/jobs/jobs";
import Companies from "./pages/companies/companies";
import Workers from "./pages/workers/workers";
import CompanyPage from "./components/company-page/company-page";
import JobPage from "./components/job-page/job-page";
import PayPage from "./pages/pay/pay";
import RegisterPage from "./pages/sign-up/sign-up";
import EmployerRegistration from "./pages/sign-up/employer-reg";
import './App.css'

function App() {
  
  return (
    <div className=''>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/companies/:id" element={<CompanyPage />} />
            <Route path="/job-page" element={<JobPage />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/sign-up/employer-reg" element={<EmployerRegistration />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
