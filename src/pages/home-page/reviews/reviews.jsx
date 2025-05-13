/* eslint-disable react/prop-types */
import Title from "../../../components/titles/titles";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ReviewCard from "./review-item";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Rating,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AppReviews = ({ result }) => {
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  let colorClass = "text-black";

  if (result >= 0 && result < 2) {
    colorClass = "text-red-500";
  } else if (result >= 2 && result < 3) {
    colorClass = "text-orange-500";
  } else if (result >= 3 && result < 4) {
    colorClass = "text-yellow-500";
  } else if (result >= 4 && result <= 5) {
    colorClass = "text-green-600";
  }

  const handleSubmit = () => {
    if (review.trim() === "" || rating === 0) {
      setAlertType("info");
      setAlertMessage("Խնդրում ենք լրացնել գնահատականը և կարծիքը։");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    console.log("Submitted review:", review, "Rating:", rating);
    setReview("");
    setRating(0);
    setOpen(false);

    setAlertType("success");
    setAlertMessage("Ձեր կարծիքը հաջողությամբ ուղարկվեց:");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="mb-[100px]">
      {showAlert && (
        <div className="fixed top-2 right-150 w-[400px] z-50">
          <Alert
            icon={alertType === "success" ? <CheckIcon fontSize="inherit" /> : null}
            severity={alertType}
            sx={{
              bgcolor: alertType === "success" ? "#e0f7fa" : "#e3f2fd",
              color: "#0f687e",
            }}
          >
            {alertMessage}
          </Alert>
        </div>
      )}

      <div className="container">
        <Title text={"Կարծիքներ"} />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className={`font-bold text-[48px] ${colorClass}`}>{result = 4}</p>
            <Rating value={`${result}`} readOnly />
            <p className="text-black text-[16px]">Ավելի քան 50 կարծիք</p>
          </div>

          <div
            onClick={() => setOpen(true)}
            className="w-[220px] h-[60px] bg-[var(--primary)] flex items-center justify-center gap-2 px-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition"
          >
            <ModeEditOutlineOutlinedIcon fontSize="medium" className="text-white" />
            <p className="text-white text-[20px]">Գրել կարծիք</p>
          </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box sx={{ ...modalStyle, border: "2px solid #0f687e" }}>
            <Typography variant="h6" mb={2}>
              Գրեք ձեր կարծիքը
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Ձեր կարծիքը"
              variant="outlined"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0f687e",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0f687e",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0f687e",
                  },
                },
                "& label.Mui-focused": {
                  color: "#0f687e",
                },
              }}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{
                  borderColor: "#0f687e",
                  color: "#0f687e",
                  "&:hover": {
                    borderColor: "#0f687e",
                    backgroundColor: "rgba(15, 104, 126, 0.04)",
                  },
                }}
              >
                Չեղարկել
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#0f687e",
                  "&:hover": {
                    bgcolor: "#0d5c72",
                  },
                }}
                onClick={handleSubmit}
              >
                Ուղարկել
              </Button>
            </Box>
          </Box>
        </Modal>

        <div className="grid grid-cols-4 gap-[50px] mt-[50px]">
          <ReviewCard image={"src/assets/images/user-image.png"} rating={4} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={3} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={5} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={5} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={5} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={5} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
          <ReviewCard image={"src/assets/images/user-image.png"} rating={5} name={"David"} surname={"Ghazaryan"} date={"3 months ago"} review={"So good website"} />
        </div>
      </div>
    </div>
  );
};

export default AppReviews;
