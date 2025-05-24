import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from './pages/home-page/home-page';
import Notfound from "./pages/not-found/notfound";
import ResumeBuilder from "./pages/resume/resume";
import ScrollToTop from "./components/scroll-top/scroll-top";
// import AboutUs from "./pages/about-us/about";
import Jobs from "./pages/jobs/jobs";
import Companies from "./pages/companies/companies";
import Workers from "./pages/workers/workers";
import CompanyPage from "./components/company-page/company-page";
import JobPage from "./components/job-page/job-page";
import PayPage from "./pages/pay/pay";
import RegisterPage from "./pages/sign-up/sign-up";
import EmployerRegistration from "./pages/sign-up/employer-reg";
import CandidatRegistration from "./pages/sign-up/candidat-reg";
import './App.css'
import { SignInPage } from "./pages/sign-in/sign-in";
import { AuthProvider } from "./providers/auth";
import { VerifyEmailPage } from "./pages/verify-email/verfiy-email";
import { SentEmailPage } from "./pages/sent-email/sent-email";
import ProtectedRoute from "./components/protected-route";
import { Dashboard } from "./dashboard/dashboard";

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            {/* <Route path="/about" element={<AboutUs />} /> */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/companies/:id" element={<CompanyPage />} />
            <Route path="/job/:id" element={<JobPage />} />
            <Route path="/pay" element={<PayPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/sign-up/employer-reg" element={<EmployerRegistration />} />
            <Route path="/sign-up/candidat-reg" element={<CandidatRegistration />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage/>} />
            <Route path="/sent-email" element={<SentEmailPage/>} />

            <Route path="" element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
