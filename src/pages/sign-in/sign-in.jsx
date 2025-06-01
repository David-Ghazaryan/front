import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { axiosInstance } from "../../axios/axios";
import { Link } from "react-router-dom";
export const SignInPage = () => {
  const {status, user, setUser, setStatus} = useAuth();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axiosInstance.post('/auth/sign-in', form);
      localStorage.setItem('access-token', data.accessToken)
      setUser(data);
      setStatus('success')
    } catch {
     setError('INVALID CREDENTIALS');
    }
  };

  const inputStyle = {
    '& label.Mui-focused': { color: 'var(--primary)' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#ccc' },
      '&:hover fieldset': { borderColor: 'var(--primary)' },
      '&.Mui-focused fieldset': { borderColor: 'var(--primary)' },
    },
  };

  if(status === 'loading') {
    return <p>Loading...</p>
  }

  if(user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-157 flex items-center justify-center bg-[var(--light)]">
      <form onSubmit={handleSubmit}>
        <div className="bg-[var(--itemColor)]  shadow-lg rounded-lg p-10 w-100">
          <h1 className="text-2xl font-semibold text-[var(--primary)] mb-6 text-center">
            Մուտք
          </h1>

          <div className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Էլ. փոստ"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
            <TextField
              fullWidth
              label="Գաղտնաբառ"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
            <p className="text-center text-sm text-gray-600 mt-5">
              Չունե՞ք հաշիվ։{" "}
              <Link to={"/sign-up"} className="font-bold text-[var(--primary)] hover:underline">
                Գրանցվել
              </Link>
            </p>
              {error && <p className="text-red-500">{error}</p>}
               <div className="mt-4">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'var(--primary)',
                    '&:hover': { backgroundColor: 'var(--primaryDark)' },
                    '&:active': { backgroundColor: 'var(--primaryDark)' },
                  }}
                >
                Մուտք
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
