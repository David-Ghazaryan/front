import { TextField, Button, MenuItem } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import { axiosInstance } from "../../axios/axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from "react";

const CandidatRegistration = () => {
   const navigate = useNavigate();
    const [error, setError] = useState('');
    const {status, user } =useAuth();
  
    const [form, setForm] = useState({
      fullName: "",
      email: "",
      password: "",
      gender: "",
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        await axiosInstance.post('/auth/sign-up', {...form, isWorker: true});
        navigate('/sent-email');
      } catch (error) {
        if(error.response.data.message === 'Այս էլ․ հասցեն արդեն զբաղված է') 
        {
          setError('Այս էլ․ հասցեն արդեն զբաղված է');
        }
      }
    };

  const inputStyle = {
    '& label.Mui-focused': {
      color: 'var(--primary)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: 'var(--primary)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--primary)',
      },
    },
  };

    if(status === 'loading') {
    return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }

  if(user) {
    return <Navigate to="/dashboard" replace />
  }

   return (
    <div className="min-h-157 flex items-center justify-center bg-[var(--light)]">
      <form onSubmit={handleSubmit}>
        <div className="bg-[var(--itemColor)] shadow-lg rounded-lg p-10 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-[var(--primary)] mb-6 text-center">
            Գրանցում որպես Թեկնածու
          </h1>

          <div className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Անուն Ազգանուն"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            />
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
            <TextField
              select
              fullWidth
              label="Սեռ"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              variant="outlined"
              sx={inputStyle}
            >
              <MenuItem value="male">Արական</MenuItem>
              <MenuItem value="female">Իգական</MenuItem>
            </TextField>

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
                Գրանցվել
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidatRegistration;
