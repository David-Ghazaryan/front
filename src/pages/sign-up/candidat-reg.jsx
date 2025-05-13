import { TextField, Button, MenuItem } from "@mui/material";

const CandidatRegistration = () => {
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

  return (
    <div className="min-h-157 flex items-center justify-center bg-[var(--light)]">
      <div className="bg-[var(--itemColor)] shadow-lg rounded-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[var(--primary)] mb-6 text-center">
          Գրանցում որպես Թեկնածու
        </h1>

        <div className="flex flex-col gap-4">
          <TextField
            fullWidth
            label="Անուն Ազգանուն"
            variant="outlined"
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Էլ. փոստ"
            variant="outlined"
            type="email"
            sx={inputStyle}
          />

          <TextField
            fullWidth
            label="Գաղտնաբառ"
            variant="outlined"
            type="password"
            sx={inputStyle}
          />

          <TextField
            select
            fullWidth
            label="Սեռ"
            variant="outlined"
            sx={inputStyle}
            defaultValue=""
          >
            <MenuItem value="male">Արական</MenuItem>
            <MenuItem value="female">Իգական</MenuItem>
          </TextField>

          <div className="mt-4">
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: 'var(--primary)',
                '&:hover': {
                  backgroundColor: 'var(--primaryDark)',
                },
                '&:active': {
                  backgroundColor: 'var(--primaryDark)',
                },
              }}
            >
              Գրանցվել
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatRegistration;
