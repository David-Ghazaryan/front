import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RefreshIcon from '@mui/icons-material/Refresh';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import OnTop from "../../components/onTop/onTop";

import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  IconButton,
  MenuItem, 
} from "@mui/material";
import './resume.css';

const DATA_INITIAL = { position: "", company: "", startDate: "", endDate: "", description: "" };
const DATA_EDUCATION = { faculty: "", university: "", startDate: "", endDate: "", description: "" };
const languageLevels = ["Մայրենի", "Սկսնակ", "Միջին", "Առաջադեմ"];
const languageOptions = [
  "Հայերեն",
  "Անգլերեն",
  "Ռուսերեն",
  "Ֆրանսերեն",
  "Գերմաներեն",
  "Իսպաներեն",
  "Իտալերեն",
  "Չինարեն",
  "Ճապոներեն",
  "Կորեերեն",
  "Պորտուգալերեն",
  "Արաբերեն",
  "Թուրքերեն",
  "Հոլանդերեն",
  "Հունարեն",
  "Վրացերեն",
  "Իրաներեն (պարսկերեն)",
  "Հինդի",
  "Ուկրաիներեն",
  "Լեհերեն",
  "Չեխերեն",
  "Դանիերեն",
  "Նորվեգերեն",
  "Շվեդերեն",
  "Ֆիններեն",
  "Հեբրայերեն",
  "Ուզբեկերեն",
  "Քրդերեն",
  "Կազախերեն",
  "Թայերեն",
  "Վիետնամերեն"
];

const ResumeBuilder = () => {
  const { 
    control,
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      surName: "",
      industry: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      bio: "",
      experiences: [DATA_INITIAL],
      education: [DATA_EDUCATION],
    }
  });

  const [expanded, setExpanded] = useState(null);
  const [languages, setLanguages] = useState([{ language: "", level: "", id: Date.now() }]);
  const formData = watch();
  const divRef = useRef();

  const handleAccordionChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : null);
  };

  const handleLanguageChange = (id, field, value) => {
    setLanguages(prev =>
      prev.map(lang => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  const addLanguageField = () => {
    const newLanguage = { language: "", level: "", id: Date.now() };
    setLanguages(prev => [...prev, newLanguage]);
  };

  const handleDeleteLanguages = () => {
    setLanguages([{ language: "", level: "", id: Date.now() }]);
  };

  const addExperience = () => {
    setValue("experiences", [...getValues("experiences"), DATA_INITIAL]);
  };

  const removeExperience = (index) => {
    const experiences = getValues("experiences");
    if (experiences.length <= 1) {
      setValue("experiences", [DATA_INITIAL]);
    } else {
      setValue("experiences", experiences.filter((_, i) => i !== index));
    }
  };

  const addEducation = () => {
    setValue("education", [...getValues("education"), DATA_EDUCATION]);
  };

  const removeEducation = (index) => {
    const education = getValues("education");
    if (education.length <= 1) {
      setValue("education", [DATA_EDUCATION]);
    } else {
      setValue("education", education.filter((_, i) => i !== index));
    }
  };

  const removeValues = () => {
    reset({
      name: "",
      surName: "",
      industry: "",
      email: "",
      phone: "",
      address: "",
      date: "",
      bio: "",
      experiences: [DATA_INITIAL],
      education: [DATA_EDUCATION],
    });
    setLanguages([{ language: "", level: "", id: Date.now() }]);
  };

  const handleDownload = async () => {
    const element = divRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${formData.name} ${formData.surName} resume.pdf"`);
  };

  return (
    <>
      <OnTop/>
      <div className="py-5">
        <div className="container">
          <div className="text-[var(--primary)] text-3xl text-center font-semibold mb-10">
            Ստեղծեք ռեզյումե առցանց
          </div>
          <div className="flex">
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md self-start">
              <div className="flex justify-between mb-3">
                <p className="text-[var(--primary)] font-medium">Լրացրեք ձեր տվյալները</p>
                <div className="flex cursor-pointer" onClick={removeValues}>
                  <RefreshIcon style={{ color: "#0f687e" }} />
                  <p className="text-[var(--primary)] font-medium">Ջնջել</p>
                </div>
              </div>

              {/* Personal Information */}
              <Accordion className="mt-5 rounded-[8px]"
                sx={{
                  boxShadow: 'none',
                  border: 'none',
                  '&::before': { display: 'none' },
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}>
                  <Typography>Անձնական Տվյալներ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Անուն"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="surName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Ազգանուն"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Մասնագիտություն"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Էլ.փոստ"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Հեռախոսահամար"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Հասցե"
                        variant="outlined"
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Ծննդյան ամսաթիվ"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(newValue) => {
                            field.onChange(newValue ? newValue.format("YYYY-MM-DD") : "");
                          }}
                          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                        />
                      </LocalizationProvider>
                    )}
                  />

                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Իմ մասին"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      />
                    )}
                  />
                </AccordionDetails>
              </Accordion>

              {/* Work Experience */}
              {formData.experiences.map((exp, index) => (
                <Accordion key={index} className="mt-5 rounded-[8px]"
                  sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}>
                    <Typography>Աշխատանքային փորձ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Controller
                      name={`experiences.${index}.position`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Պաշտոն"
                          fullWidth
                          margin="normal"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                          }}
                        />
                      )}
                    />

                    <Controller
                      name={`experiences.${index}.company`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Ընկերություն"
                          fullWidth
                          margin="normal"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                          }}
                        />
                      )}
                    />

                    <Controller
                      name={`experiences.${index}.startDate`}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Աշխատանքի սկիզբ"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                              field.onChange(newValue ? newValue.format("DD.MM.YYYY") : "");
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    <Controller
                      name={`experiences.${index}.endDate`}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Աշխատանքի ավարտ"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                              field.onChange(newValue ? newValue.format("DD.MM.YYYY") : "");
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    <Controller
                      name={`experiences.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Նկարագրություն"
                          multiline
                          rows={4}
                          fullWidth
                          margin="normal"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                          }}
                        />
                      )}
                    />

                    <IconButton onClick={() => removeExperience(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </AccordionDetails>
                </Accordion>
              ))}
              <button 
                onClick={addExperience}
                className="self-start mt-2 px-3 py-1 bg-[var(--primary)] text-white rounded hover:bg-[#095563] transition"
              >
                + Ավելացնել փորձ
              </button>

              {/* Education */}
              {formData.education.map((edu, index) => (
                <Accordion key={index} className="mt-5 rounded-[8px]"
                  sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}>
                    <Typography>Կրթություն</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Controller
                      name={`education.${index}.faculty`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Ֆակուլտետ"
                          fullWidth
                          margin="normal"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                          }}
                        />
                      )}
                    />

                    <Controller
                      name={`education.${index}.university`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Համալսարան"
                          fullWidth
                          margin="normal"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                          }}
                        />
                      )}
                    />

                    <Controller
                      name={`education.${index}.startDate`}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Սկիզբ"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                              field.onChange(newValue ? newValue.format("DD.MM.YYYY") : "");
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    <Controller
                      name={`education.${index}.endDate`}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Ավարտ"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(newValue) => {
                              field.onChange(newValue ? newValue.format("DD.MM.YYYY") : "");
                            }}
                            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
                          />
                        </LocalizationProvider>
                      )}
                    />

                    <IconButton onClick={() => removeEducation(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </AccordionDetails>
                </Accordion>
              ))}
              <button 
                onClick={addEducation}
                className="self-start mt-2 px-3 py-1 bg-[var(--primary)] text-white rounded hover:bg-[#095563] transition"
              >
                + Ավելացնել կրթություն
              </button>

              {/* Languages */}
              <Accordion 
                expanded={expanded === "languages"} 
                onChange={handleAccordionChange("languages")}
                className="mt-5 rounded-[8px]"
                sx={{ boxShadow: 'none', border: 'none', '&::before': { display: 'none' } }}>
                <AccordionSummary 
                  sx={{ paddingLeft: "0 !important", paddingRight: "0 !important" }}
                  expandIcon={<ExpandMoreIcon />} 
                >
                  <div className="w-full flex justify-between items-center">
                    <Typography>Լեզուներ</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-3">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex gap-5">
                      <TextField
                        select
                        fullWidth
                        className="flex-1"
                        label="Լեզու"
                        value={lang.language}
                        onChange={(e) =>
                          handleLanguageChange(lang.id, "language", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      >
                        {languageOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        select
                        fullWidth
                        className="flex-1"
                        label="Մակարդակ"
                        value={lang.level}
                        onChange={(e) =>
                          handleLanguageChange(lang.id, "level", e.target.value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": { borderColor: "#0f687e" },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#0f687e" },
                        }}
                      >
                        {languageLevels.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={addLanguageField}
                      className="self-start mt-2 px-3 py-1 bg-[var(--primary)] text-white rounded hover:bg-[#095563] transition"
                    >
                      + Ավելացնել լեզու
                    </button>
                    <IconButton onClick={handleDeleteLanguages}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </AccordionDetails>
              </Accordion>
              
              <button 
                className="flex justify-center w-full bg-[var(--primary)] text-white p-2 rounded mt-4 cursor-pointer" 
                onClick={handleDownload}
              >
                <DownloadIcon /> <p>Ներբեռնել</p>
              </button>
            </div>

            {/* Resume Preview */}
            <div className="w-2/3 h-[842px] bg-white ml-6 p-6 shadow-md resume-container" ref={divRef}>
              <div className="flex justify-between border-b-3 border-[var(--primary)] pb-2 mb-2">
                <div> 
                  <h1 className="text-3xl font-bold text-[var(--primary)]">
                    {formData.name ? formData.name : "Անուն"} {formData.surName ? formData.surName : "Ազգանուն"}
                  </h1>
                  <p className="font-bold mt-3 text-[var(--primary)]">
                    {formData.industry ? formData.industry : "Մասնագիտություն"}
                  </p>
                </div>
                <div>
                  {formData.email && <div><EmailIcon sx={{ color: 'var(--primary)'}}/> {formData.email}</div>}
                  {formData.phone && <div><PhoneIcon sx={{ color: 'var(--primary)'}}/> {formData.phone}</div>}
                  {formData.address && <div><LocationOnIcon sx={{ color: 'var(--primary)'}}/> {formData.address}</div>}
                  {formData.date && <div><CalendarMonthIcon sx={{ color: 'var(--primary)'}}/> {formData.date}</div>}
                </div>
              </div>

              {formData.bio && 
                <div className="flex flex-col">
                  <p className="text-[var(--primary)] font-bold text-2xl">Իմ մասին</p>
                  <p className="indent-5">{formData.bio}</p>
                </div>
              }

              <div className="flex flex-col mt-3">
                <p className="text-[var(--primary)] font-bold text-2xl">Աշխատանքային փորձ</p>
                {formData.experiences.map((exp, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex">
                        <p><strong> {exp.position ? exp.position : "Պաշտոն"} /</strong> </p>
                        <p> <strong> {exp.company ? exp.company : "Ընկերություն"} </strong></p>
                      </div>
                      <div className="flex">
                        <p> <strong> {exp.startDate ? exp.startDate : "Սկսած"}-</strong></p>
                        <p> <strong> {exp.endDate ? exp.endDate : "Մինչ այսօր"} </strong></p>
                      </div>
                    </div>
                    <p> {exp.description ? exp.description : "Նկարագրություն"} </p>
                  </div>
                ))} 
              </div>

              <div className="flex flex-col mt-3">
                <p className="text-[var(--primary)] font-bold text-2xl">Կրթություն</p>
                {formData.education.map((edu, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p> <strong> {edu.university ? edu.university : "Համալսարան"} </strong></p>
                        <p> {edu.faculty ? edu.faculty : "Ֆակուլտետ"} </p>
                      </div>
                      <div className="flex">
                        <p> <strong> {edu.startDate ? edu.startDate : "Սկսած"}-</strong></p>
                        <p> <strong> {edu.endDate ? edu.endDate : "Մինչ այսօր"} </strong></p>
                      </div>
                    </div>
                  </div>
                ))} 
              </div>

              <div className="flex flex-col mt-3">
                <p className="text-[var(--primary)] font-bold text-2xl">Լեզուներ</p>
                {languages.map((lan, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex">
                        <p><strong>{lan.language || "Լեզու"}</strong>&nbsp;/&nbsp;</p>
                        <p><strong>{lan.level || "Մակարդակ"}</strong></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;