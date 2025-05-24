import { useEffect, useState } from "react"
import { axiosInstance } from "../../axios/axios"
import { useSearchParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
export const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('idle');
    const token = searchParams.get('token');
    useEffect(() => {
     setStatus('loading')
    axiosInstance.post('/auth/verify-email', {token}).then(() => setStatus('success')).catch(() => setStatus('error'))
    }, [token]);

    if(status === 'idle') {
        return(
            <Box sx={{ display: 'flex' , color: 'var(--primary)'}}>
                <CircularProgress />
            </Box>
        )
    }

    if(status === 'error') {
        return <p>Error</p>
    }

    return (
        <div className="min-h-screen flex justify-center items-center z-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-[90%] max-w-sm text-center">
                <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                </div>
                <h2 className="text-xl font-semibold text-[var(--primary)] mb-2">Շնորհավորում եմ դուք հաջողությամբ գրանցվեցիք</h2>
                <p className="text-sm text-gray-600 mb-6">Գնացեք <Link to={'/sign-in'}>  <span className="text-[var(--primary)] font-bold"> Մուտք </span> </Link> որպեսզի կարողանաք մտնել ձեր հաշիվ</p>
            </div>
        </div>
    )
}