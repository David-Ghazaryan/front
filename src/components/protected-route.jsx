import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth";
import CircularProgress from '@mui/material/CircularProgress';
export default function ProtectedRoute() {
  const { status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress sx={{color:'var(--primary)'}} />
      </div>
    );
  }

  if (status === 'error') {
    return <Navigate to="/sign-in" replace/>;
  }

  return <Outlet />;
}
