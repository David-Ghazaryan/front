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
import femaleAvatar from "/src/assets/images/female-photo.png";
import maleAvatar from "/src/assets/images/male-photo.png";
import editImage from "/src/assets/images/edit-image.png";
import { useRef } from "react";

export const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset(user); 
    }
    console.log(user)
  }, [user, reset]);
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
      const response = await axios.patch(`${config.BACK_URL}/api/user/info`,
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
    const scheduleTypes = {
        FULL_TIME: "Լրիվ դրույք",
        HALF_TIME: "Կես դրույք",
        FLEXIBLE: "Ճկուն գրաֆիկ",
        CONTRACT: "Պայմանագրային",
        TEMPORARY: "Ժամանակավոր/Սեզոնային",
        INTERNSHIP: "Ինտերնշիփ",
        REMOTE: "Հեռավար"
    };

    // const levelTypes = {
    //     NOT_REQUIRED: "Չի պահանջվում",
    //     BEGINNER: "Սկսնակ",
    //     MIDDLE: "Միջին",
    //     EXPERIENCED: "Փորձառու"
    // };
  const handleCancel = () => {
    reset(user);
    setIsEditOpen(false);
  };
 const fileInputRef = useRef(null);


  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const avatarRes = await axios.post(`${config.BACK_URL}/api/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const newAvatarPath = avatarRes.data.filePath; 
    setUser((prev) => ({ ...prev, avatar: newAvatarPath }));
    try{
      await axios.patch(`${config.BACK_URL}/api/users/${user.id}`, {
        avatar: newAvatarPath,
      });
    }catch{
        console.log('error image update in database')
    }
  } catch {
    console.log('upload image error');
  }

};

      const handleDeleteAvatar = async () => {
        try {
          await axios.patch(`${config.BACK_URL}/api/user/${user.id}/avatar`, {
            avatar: null,
          });

          setUser((prev) => ({ ...prev, avatar: null }));
          setShowModal(false);
          console.log('image deleted');
        } catch (err) {
          console.error("Չհաջողվեց ջնջել նկարը", err);
        }
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
             <div className="flex flex-col items-center justify-center">
                <div className="w-33 h-33 rounded-full flex items-center justify-center border-2 border-[var(--primary)]">
                  <img
                    src={
                      user?.avatar
                        ? `${config.BACK_URL}${user.avatar}`
                        : user?.info?.gender === "male"
                        ? maleAvatar
                        : femaleAvatar
                    }
                    alt="avatar"
                    className="w-32.5 h-32.5 rounded-full object-cover"
                  />
                </div>

                <img
                  className="w-19 h-19 object-contain -translate-y-[70px] translate-x-[28px] hover:cursor-pointer"
                  src={editImage}
                  alt="edit"
                  onClick={() => {
                    setShowModal(true);  
                  }}

                />

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                      <h2 className="text-lg font-bold mb-4 text-[var(--primary)]">Նկարի կարգավորումներ</h2>
                      <div className="flex justify-around">
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <button
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            className="bg-[var(--primary)] text-white px-4 py-2 rounded hover:bg-[var(--primaryDark)]"
                          >
                            Փոփոխել
                          </button>
                        </>
                        <button
                          onClick={handleDeleteAvatar}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Ջնջել
                        </button>
                      </div>
                      <button
                        onClick={() => setShowModal(false)}
                        className="mt-4 text-sm text-gray-600 hover:underline"
                      >
                        Փակել
                      </button>
                    </div>
                  </div>
                )}
                  

              </div>
            <div className="-translate-y-8">
              <h2 className="text-lg text-[var(--primary)] font-semibold">
                {user?.fullName}
              </h2>
              <p className="text-md text-gray-600 mt-1">{user?.info?.industryName}</p>
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
          {user?.role === "EMPLOYER" && (
            <p
              className={`cursor-pointer font-semibold ${ activeTab === "companies" ? "text-[var(--primary)]" : "" }`}
              onClick={() => setActiveTab("companies")}
            >
              Ընկերություններ
            </p>
          )}
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
                  <PhoneIcon sx={{ color: "var(--primary)" }} /> {user?.info?.phoneNumber }
                </div>
                <div>
                  <FmdGoodOutlinedIcon sx={{ color: "var(--primary)" }} />{" "}
                  {user?.info?.city}
                </div>
                <div>
                  <AccessTimeIcon sx={{ color: "var(--primary)" }} />{" "}
                  {scheduleTypes[user?.info?.scheduleType]}
                </div>
                <a 
                  href={`${config.BACK_URL}${user?.user?.cvUrl}`}
                  target="_blank"
                  rel="noopener noreferrer" >
                  <div className="flex items-center text-white justify-evenly rounded-xl bg-[var(--primary)] w-40 h-10 cursor-pointer">
                    <StickyNote2Icon sx={{ color: "white", marginRight: "8px" }} />
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
        {user?.role === "EMPLOYER" && (
          <>
            {activeTab === "companies" && (
              <div className="bg-white shadow p-4 rounded-lg">
                <h3 className="font-semibold text-[var(--primary)]">
                  Ընկերություններ
                </h3>
                <p className="text-gray-600">Աշխատում ենք այս բաժնի վրա...</p>
              </div>
            )}
          </>
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
                <TextField label="Ոլորտ" fullWidth {...register("industryName")} />
                <TextField label="Քաղաք" fullWidth {...register("city")} />
                <TextField label="Աշխ․ գրաֆիկ" fullWidth {...register("scheduleType")} />
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
