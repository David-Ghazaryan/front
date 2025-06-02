import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import CircularProgress from '@mui/material/CircularProgress';
const RegisterPage = () => {
  const {status, user} = useAuth();

   if(status === 'loading') {
    return (
          <div className="min-h-screen flex items-center justify-center py-10 text-lg">
            <CircularProgress sx={{ color: '#0f687e' }} />
          </div>
        );
  }

  if(user) {
    return <Navigate to="/dashboard" replace />
  }

    return (
      <div className="min-h-157 flex items-center justify-center bg-[var(--light)] ">
        <div className="bg-[var(--itemColor)] shadow-lg rounded-lg p-10 w-full max-w-md ">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Գրանցում</h1>
          <div className="flex flex-col mt-10 items-center gap-4">
            <Link to={"/sign-up/employer-reg"}>
              <div className="text-[var(--itemColor)] w-90 bg-[var(--primary)] font-semibold py-3 rounded text-center">
                Որպես գործատու
              </div>
            </Link>
            <Link to={"/sign-up/candidat-reg"}>
              <div className="font-semibold w-90 text-[var(--primary)] border-[var(--primary)] py-3 rounded text-center border" >
                Որպես թեկնածու
              </div>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600 mt-60">
            Ունե՞ք օգտագործման հաշիվ։{" "}
            <Link to={"/sign-in"} className="font-bold text-[var(--primary)] hover:underline">
              Մուտք
            </Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
  