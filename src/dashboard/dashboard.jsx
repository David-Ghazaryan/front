import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../providers/auth";
import axios from "axios";
import config from "../config/public";
import femaleAvatar from "/src/assets/images/female.png";
import maleAvatar from "/src/assets/images/male.png";

export const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset(user); 
    }
  }, [user, reset]);
  console.log(user);
  const handleSave = async (data) => {
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("industry", data.industry);
    formData.append("city", data.city);
    formData.append("scheduleType", data.scheduleType);
    if (data.avatar?.[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await axios.put(`${config.BACK_URL}/api/users/info`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Տեղի ունեցավ սխալ:", error);
    }
  };

  const handleCancel = () => {
    reset(user);
    setIsEditOpen(false);
  };

  return (
    <div className="my-5">
      <div className="container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-[var(--primary)]">
            Կառավարման էջ
          </h1>
          <button className="text-red-500 hover:cursor-pointer font-bold" onClick={logout}>
            Դուրս գալ <LogoutIcon />
          </button>
        </div>

        <div className="bg-[var(--itemColor)] shadow p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={ user?.avatar ? `${config.BACK_URL}${user.avatar}`: user?.info?.gender === "MALE" ? maleAvatar: femaleAvatar}
              alt="avatar"
              className="w-30 h-30 rounded-full object-cover border-1"
            />
            <div>
              <h2 className="text-lg text-[var(--primary)] font-semibold">
                {user?.fullName}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{user?.info?.industry?.title}</p>
            </div>
          </div>
          <div className="text-right cursor-pointer" onClick={() => setIsEditOpen(true)}>
            <EditIcon />
          </div>
        </div>

        <div className="flex gap-6 text-sm font-medium border-b pb-2">
          <p
            className={`cursor-pointer font-semibold ${ activeTab === "info" ? "text-[var(--primary)]" : "" }`}
            onClick={() => setActiveTab("info")}
          >
            Անձնական տվյալներ
          </p>
          <p
            className={`cursor-pointer font-semibold ${ activeTab === "description" ? "text-[var(--primary)]" : "" }`}
            onClick={() => setActiveTab("description")}
          >
            Նկարագրություն
          </p>
          <p
            className={`cursor-pointer font-semibold ${ activeTab === "companies" ? "text-[var(--primary)]" : "" }`}
            onClick={() => setActiveTab("companies")}
          >
            Ընկերություններ
          </p>
        </div>

        {activeTab === "info" && (
          <div className="bg-white shadow p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-5 text-[var(--primary)]">
                Անձնական տվյալներ
              </h3>
              <div className="grid sm:grid-cols-2 gap-5 text-sm">
                <div>
                  <MailOutlineIcon sx={{ color: "var(--primary)" }} />{" "}
                  {user?.email}
                </div>
                <div>
                  <PhoneIcon sx={{ color: "var(--primary)" }} /> {user?.info?.phone}
                </div>
                <div>
                  <FmdGoodOutlinedIcon sx={{ color: "var(--primary)" }} />{" "}
                  {user?.info?.city}
                </div>
                <div>
                  <AccessTimeIcon sx={{ color: "var(--primary)" }} />{" "}
                  {user?.info?.scheduleType}
                </div>
                <a href={user?.info?.cvUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <StickyNote2Icon sx={{ color: "var(--primary)", marginRight: "8px" }} />
                    Տեսնել CV-ն
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "description" && (
          <div className="bg-white shadow p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-5 text-[var(--primary)]">
                Նկարագրություն
              </h3>
              <div className="indent-5 mr-10">
                {user?.info?.info ? (
                  <p>{user.info?.info}</p>
                ) : (
                  <p className="text-gray-400">Տվյալներ չկան</p>
                )}
              </div>
            </div>
            <div>
              <EditIcon />
            </div>
          </div>
        )}

        {activeTab === "companies" && (
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="font-semibold text-[var(--primary)]">
              Ընկերություններ
            </h3>
            <p className="text-gray-600">Աշխատում ենք այս բաժնի վրա...</p>
          </div>
        )}

        {isEditOpen && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <form
              onSubmit={handleSubmit(handleSave)}
              className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md space-y-4"
            >
              <h2 className="text-xl font-semibold text-[var(--primary)]">
                Խմբագրել տվյալները
              </h2>
              <Stack spacing={2}>
                <TextField label="Անուն Ազգանուն" fullWidth {...register("fullName")} />
                <TextField label="Հեռախոս" fullWidth {...register("phone")} />
                <TextField label="Ոլորտ" fullWidth {...register("industry")} />
                <TextField label="Քաղաք" fullWidth {...register("city")} />
                <TextField label="Աշխ․ գրաֆիկ" fullWidth {...register("scheduleType")} />
                <input type="file" {...register("avatar")} />
              </Stack>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cursor-pointer px-4 py-2 rounded bg-gray-300"
                >
                  Չեղարկել
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-4 py-2 rounded bg-[var(--primary)] text-white"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
