import { useState } from "react";
import { Alert } from "@mui/material"; 
import CheckIcon from "@mui/icons-material/Check"; 
import { useNavigate } from 'react-router-dom'; 
const PayPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowAlert(false);
    setAlertType("");
    setAlertMessage("");

    const plainCardNumber = cardNumber.replace(/\s/g, "");
    if (plainCardNumber.length !== 16) {
      setAlertType("error");
      setAlertMessage("Քարտի համարը պետք է լինի 16 նիշ");
      setShowAlert(true);
      return;
    }

    if (!cardName || cardName.length < 10) {
      setAlertType("error");
      setAlertMessage("Քարտապանը պետք է լինի առնվազն 10 նիշ");
      setShowAlert(true);
      return;
    }

    if (!expDate || expDate.length !== 5 || !/^(\d{2})\/(\d{2})$/.test(expDate)) {
      setAlertType("error");
      setAlertMessage("Քարտի ժամկետը պետք է լինի MM/YY ձևաչափով");
      setShowAlert(true);
      return;
    }

    if (!cvv || cvv.length < 3) {
      setAlertType("error");
      setAlertMessage("CVV-ն պետք է լինի առնվազն 3 նիշ");
      setShowAlert(true);
      return;
    }
    setAlertType("success");
    setAlertMessage("Վճարումը հաջողությամբ կատարվեց");
    setShowAlert(true);

    console.log("Վճարելու փորձ:", { cardNumber, cardName, expDate, cvv });
    setTimeout(() => {
      navigate('/');  // Navigate to homepage after 3 seconds
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Վճարման էջ</h2>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Քարտի համար</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "").slice(0, 16);
              value = value.replace(/(.{4})/g, "$1 ").trim();
              setCardNumber(value);
            }}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            maxLength={19}
            required
          />
        </div>

        {/* Card Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Քարտապան</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(/[^ա-ֆԱ-Ֆa-zA-Z\s]/g, "");
              setCardName(onlyLetters.toUpperCase());
            }}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Անուն Ազգանուն"
            maxLength={30}
            required
          />
        </div>

        <div className="flex gap-4 mb-4">
          {/* Expiry Date */}
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Քարտի ժամկետը</label>
            <input
              type="text"
              value={expDate}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "").slice(0, 4); // only numbers, max 4 digits
                if (value.length >= 3) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                }
                setExpDate(value);
              }}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="MM/YY"
              inputMode="numeric"
              maxLength={5}
              required
            />
          </div>

          {/* CVV */}
          <div className="w-1/2">
            <label className="block mb-1 font-medium">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="***"
              maxLength={4}
              inputMode="numeric"
              required
            />
          </div>
        </div>

        {/* Error/Success Alert */}
        {showAlert && (
          <div className="fixed top-2 right-1/2 transform translate-x-1/2 w-[400px] z-50">
            <Alert
              icon={alertType === "success" ? <CheckIcon fontSize="inherit" /> : null}
              severity={alertType}
              sx={{
                bgcolor: alertType === "success" ? "#e0f7fa" : "#fdc9c9",
                color: "#0f687e",
              }}
            >
              {alertMessage}
            </Alert>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white py-2 rounded hover:bg-green-700 transition"
        >
          Վճարել
        </button>
      </form>
    </div>
  );
};

export default PayPage;
