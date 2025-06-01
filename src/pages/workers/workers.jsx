/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Worker from './worker';
import GorcUxiService from '../../services/gorcuxi_service';
import config from '../../config/public';
import femaleAvatar from "/src/assets/images/female-photo.png";
import maleAvatar from "/src/assets/images/male-photo.png";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skeleton } from '@mui/material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
const Workers = () => {

const service = new GorcUxiService();


const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [workers, setWorkers] = useState([]);
const [loading, setLoading] = useState(true);
const [counts,setCounts] = useState();
const [search, setSearch] = useState('');
const [industry, setIndustry] = useState('');
const [selectedCities, setSelectedCities] = useState([]);
const [selectedGender, setSelectedGender] = useState("");
const [selectedSchedule, setSelectedSchedule] = useState('');
const [selectedLevel, setSelectedLevel] = useState('');

const cityArray = [
  "Երևան",
  "Գյումրի",
  "Վանաձոր",
  "Վաղարշապատ",
  "Հրազդան",
  "Աբովյան",
  "Կապան",
  "Չարենցավան",
  "Գավառ",
  "Արտաշատ",
  "Մասիս",
  "Սիսյան",
  "Արմավիր",
  "Սպիտակ",
  "Սևան",
  "Ալավերդի",
  "Իջևան",
  "Եղեգնաձոր",
  "Բերդ",
  "Դիլիջան",
  "Այլ"
];

const levelTypes = {
  INTERN: "Ինտերն",
  BEGINNER: "Սկսնակ",
  MIDDLE: "Միջին",
  EXPERIENCED: "Փորձառու"
};
const genders = {male:"Տղա",female:"Աղջիկ"};
const scheduleTypes = {
  FULL_TIME: "Լրիվ դրույք",
  HALF_TIME: "Կես դրույք",
  FLEXIBLE: "Ճկուն գրաֆիկ",
  CONTRACT: "Պայմանագրային",
  TEMPORARY: "Ժամանակավոր/Սեզոնային",
  INTERNSHIP: "Ինտերնշիփ",
  REMOTE: 'Հեռավար'
};

const fetchUsers = async ({
  page = 1,
  nameQ = '',
  industryName = '',
  city = '',
  gender = '',
  scheduleType = '',
  level = ''
} = {}) => {
  try {
    setLoading(true);
    const res = await service.getAllUser({
      page,
      nameQ,
      industryName,
      city,
      gender,
      scheduleType,
      level
    });
    setWorkers(res.data);
    setCounts(res.pagination.total);
    setTotalPages(res.pagination.totalPages);
    setPage(res.pagination.page);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  fetchUsers({
    page,
    nameQ: search,
    industryName: industry,
    city: selectedCities.join(','),
    gender: selectedGender,
    scheduleType: selectedSchedule,
    level: selectedLevel
  });
}, [page, selectedCities, selectedGender, selectedSchedule, selectedLevel]);


  if (loading) {
    return  (
      <div className="container mx-auto px-4">
        {/* Title Skeleton */}
        <div className="flex flex-col items-center py-8">
          <Skeleton
            variant="text"
            width={300}
            height={40}
            sx={{ fontSize: '2.5rem', borderRadius: '8px', bgcolor: 'var(--primary)', opacity: '30%' }}
          />
          <Skeleton
            variant="text"
            width={250}
            height={25}
            sx={{ fontSize: '1rem', borderRadius: '8px', marginTop: '8px', bgcolor: 'var(--primary)', opacity: '30%' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 mb-10">
          {/* Filter Sidebar Skeleton */}
          <div className="w-full lg:w-[450px] bg-[var(--itemColor)] shadow-lg rounded-lg p-4 space-y-4">
            <Skeleton variant="text" width="50%" height={30} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
            <Skeleton variant="rectangular" width="100%" height={50} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
            <Skeleton variant="text" width="30%" height={20} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
            <Skeleton variant="rectangular" width="100%" height={120} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
          </div>

          {/* Worker List Skeleton */}
          <div className="flex-1 max-w-4xl space-y-4">
            <div className="w-full h-14 mb-5 bg-[var(--itemColor)] shadow-lg rounded-lg flex items-center justify-between px-4">
              <Skeleton
                variant="text"
                width={180}
                height={25}
                sx={{ borderRadius: '4px', bgcolor: 'var(--primary)', opacity: '30%' }}
              />
            </div>

            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[800px] h-[100px] mb-5 bg-[var(--itemColor)] shadow-lg rounded-[8px] flex items-center justify-between p-3"
              >
                {/* Avatar */}
                <div className="flex">
                  <div className="w-20 h-20 mr-2 rounded-full overflow-hidden flex items-center justify-center">
                    <Skeleton variant="circular" width={80} height={80} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
                  </div>

                  {/* Name & Industry */}
                  <div className="flex flex-col justify-center gap-1">
                    <Skeleton variant="text" width={140} height={25} sx={{ bgcolor: 'var(--primary)' , opacity: '30%'}} />
                    <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
                  </div>
                </div>

                {/* Salary & Info */}
                <div className="flex flex-col items-center justify-center">
                  <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
                  <Skeleton variant="text" width={120} height={18} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
                </div>

                {/* Button */}
                <div className="mr-10">
                  <Skeleton
                    variant="rectangular"
                    width={150}
                    height={50}
                    sx={{ borderRadius: 9999, bgcolor: 'var(--primary)', opacity: '30%' }}
                  />
                </div>
              </div>
            ))}

            {/* Pagination Skeleton */}
            <Stack className="mt-8 flex items-center justify-center">
              <Skeleton variant="rectangular" width={200} height={40} sx={{ bgcolor: 'var(--primary)', opacity: '30%' }} />
            </Stack>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center py-8">
        <h1 className="font-bold font-inter text-3xl md:text-4xl text-[var(--primary)] text-center">
          Լավագույն աշխատակիցները մեկ հարթակում
        </h1>
        <p className="font-extralight font-inter text-sm md:text-base text-gray-500 mt-2 text-center">
          Ծանոթացիր փորձառու մասնագետներին և գտիր քո թիմի նոր անդամին։
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 mb-10">
        {/* Filters Section */}
        <div className=" w-1/3 self-start bg-[var(--itemColor)] shadow-lg rounded-lg">
          <div className="p-4">
            <div className="flex justify-between border-b-2 pb-3 border-[var(--primary)]">
              <h2 className="text-lg font-bold">Որոնման Ֆիլտրներ</h2>
              <button
                className="text-lg font-bold text-[var(--primary)] hover:underline cursor-pointer"
                onClick={() => {
                  setSearch('');
                  setIndustry('');
                  setSelectedCities([]);
                  setSelectedGender('');
                  setSelectedSchedule('');
                  setSelectedLevel('');
                  setPage(1);

                  fetchUsers({
                    page: 1,
                    nameQ: '',
                    industryName: '',
                    city: '',
                    gender: '',
                    scheduleType: '',
                    level: '',
                  });
                }}
              >
                Մաքրել Բոլորը
              </button>
            </div>
            <TextField
              fullWidth
              label="Որոնել անունով"
              variant="outlined"
              value={search}
              style={{marginTop: '15px'}}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setPage(1);
                        fetchUsers({ page: 1, nameQ: search });
                      }}
                    >
                      <SearchIcon sx={{ color: 'var(--primary)' }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#0f687e !important',
                  borderColor: '#0f687e !important',
                  '&:hover': {
                    backgroundColor: '#e0f2f1 !important',
                  },
                },
                '& .Mui-selected': {
                  backgroundColor: '#0f687e !important',
                  color: '#fff !important' ,
                  '&:hover': {
                    backgroundColor: '#0d5c6e !important',
                  },
                },
              }}
            />
              <FormControl fullWidth style={{marginBottom: '15px',marginTop: '15px'}}>
              <InputLabel>Աշխ․ գրաֆիկ</InputLabel>
              <Select
                value={selectedSchedule}
                label="Աշխ․ գրաֆիկ"
                onChange={(e) => setSelectedSchedule(e.target.value)}
                
              >
                <MenuItem value="">Բոլորը</MenuItem>
                  {Object.entries(scheduleTypes).map(([key, label]) => (
                    <MenuItem key={key} value={key}>{label}</MenuItem>
                  ))}
              </Select>
            </FormControl>

              <FormControl fullWidth>
                <InputLabel>Փորձի մակարդակ</InputLabel>
                <Select
                  value={selectedLevel}
                  label="Փորձի մակարդակ"
                  onChange={(e) => setSelectedLevel(e.target.value)}
                >
                  <MenuItem value="">Բոլորը</MenuItem>
                  {Object.entries(levelTypes).map(([key, label]) => (
                    <MenuItem key={key} value={key}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Accordion className=' rounded-[8px]'
                sx={{
                      boxShadow: 'none',      
                      border: 'none',       
                      '&::before': {
                        display: 'none',       
                      },
                      padding:"none",
                      }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="city-checkboxes"
                  id="city-accordion"
                  sx={{
                    paddingLeft: "0 !important",
                    paddingRight: "0 !important",
                  }}
                  className='h-[60px]'
                >
                  <Typography>Քաղաքներ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)", // 2 սյուն
                      maxWidth: "600px"
                    }}
                  >
                    {cityArray.map((city, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={selectedCities.includes(city)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCities([...selectedCities, city]);
                                } else {
                                  setSelectedCities(selectedCities.filter((c) => c !== city));
                                }
                              }}
                              sx={{
                                color: "#0f687e",
                                "&.Mui-checked": {
                                  color: "#0f687e"
                                }
                              }}
                            />
                          }
                          label={city}
                        />
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion className=' rounded-[8px]'
                sx={{
                      boxShadow: 'none',      
                      border: 'none',       
                      '&::before': {
                        display: 'none',       
                      },
                      padding:"none",
                      }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="city-checkboxes"
                  id="city-accordion"
                  sx={{
                    paddingLeft: "0 !important",
                    paddingRight: "0 !important",
                  }}
                  className='h-[60px]'
                >
                  <Typography>Սեռ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: "repeat(2, 1fr)", 
                      maxWidth: "600px"
                    }}
                  >
                  {Object.entries(genders).map(([key, label]) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={selectedGender === key}
                          onChange={() =>
                            setSelectedGender(prev => (prev === key ? '' : key))
                          }
                          sx={{
                            color: "#0f687e",
                            "&.Mui-checked": {
                              color: "#0f687e",
                            },
                          }}
                        />
                      }
                      label={label}
                    />
                  ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              

          </div>
        </div>

        {/* Workers List Section */}
        <div className="flex-1 w-2/3">
          <div className="w-full h-14 mb-5 bg-[var(--itemColor)] shadow-lg rounded-lg flex items-center justify-between px-4">
            <p className="text-[var(--primary)] font-bold">
              Գտնվել է՝ {counts} աշխատակից
            </p>
          </div>

          {/* Workers List */}
          {workers.length > 0 ? (
            <div className="space-y-4">
              {workers.map((worker) => (
                <Worker
                  key={worker.id}
                  id={worker.id}
                  avatar={
                    worker?.avatar
                      ? `${config.BACK_URL}${worker.avatar}`
                      : worker?.info?.gender === "male"
                        ? maleAvatar
                        : femaleAvatar
                  }
                  fullName={worker.fullName}
                  city={worker.info?.city}
                  industry={worker.info?.industryName}
                  salary={worker.info?.salary}
                  scheduleType={scheduleTypes[worker.info?.scheduleType]}
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-48 bg-[var(--itemColor)] shadow-lg rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Ոչ մի արդյունք չի գտնվել</p>
            </div>
          )}

          { totalPages > 1 && (
            <Stack className="mt-8 flex items-center justify-center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)} 
                variant="outlined"
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#0f687e !important',
                    borderColor: '#0f687e !important',
                    '&:hover': {
                      backgroundColor: '#e0f2f1 !important',
                    },
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#0f687e !important',
                    color: '#fff !important' ,
                    '&:hover': {
                      backgroundColor: '#0d5c6e !important',
                    },
                  },
                }}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workers;
