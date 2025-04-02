import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from './pages/home-page/home-page';
import Notfound from "./pages/not-found/notfound";
import ResumeBuilder from "./pages/resume/resume";
import ScrollToTop from "./components/scroll-top/scroll-top";
import AboutUs from "./pages/about-us/about";
import Jobs from "./pages/jobs/jobs";
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
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
