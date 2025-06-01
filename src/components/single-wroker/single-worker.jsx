/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import femaleAvatar from "/src/assets/images/female-photo.png";
import maleAvatar from "/src/assets/images/male-photo.png";
import config from "../../config/public";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import CircularProgress from '@mui/material/CircularProgress';
import WestIcon from '@mui/icons-material/West';
import GorcUxiService from "../../services/gorcuxi_service";

const SingleWorker = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  const service = new GorcUxiService();

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const res = await service.getUser(id);
        setWorker(res);
      } catch (error) {
        console.error("Չհաջողվեց բեռնել օգտատիրոջ տվյալները:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-10 text-lg">
        <CircularProgress sx={{ color: '#0f687e' }} />
      </div>
    );
  }

  if (!worker || !worker.info) {
    return (
      <div className="min-h-screen flex items-center justify-center py-10 text-lg text-red-500">
        Տվյալներ չեն գտնվել
      </div>
    );
  }

  const scheduleTypes = {
    FULL_TIME: "Լրիվ դրույք",
    HALF_TIME: "Կես դրույք",
    FLEXIBLE: "Ճկուն գրաֆիկ",
    CONTRACT: "Պայմանագրային",
    TEMPORARY: "Ժամանակավոր/Սեզոնային",
    INTERNSHIP: "Ինտերնշիփ"
  };

  const {
    fullName,
    phone,
    email,
    avatar,
    info
  } = worker;

  const {
    city,
    gender,
    cvUrl,
    salary,
    scheduleType,
    industryName
  } = info;

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-white shadow-md rounded-2xl p-6 my-6 flex flex-col w-full md:w-1/4">
          <Link to={'/workers'}>
            <WestIcon sx={{ color: '#0f687e' }} fontSize="medium" />
          </Link>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--primary)]">
              <img
                src={avatar ? `${config.BACK_URL}${avatar}` : gender === "male" ? maleAvatar : femaleAvatar}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
            <h2 className="text-[var(--primary)] mt-4 text-2xl font-semibold text-center md:text-left">{fullName}</h2>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <p className="text-[var(--primary)] font-bold">Կապի միջոցներ՝</p>
            <div className="flex gap-2 ml-2">
              <MailOutlineIcon fontSize="small" sx={{ color: '#0f687e' }} />
              <p className="text-gray-600 text-sm">{email}</p>
            </div>
            <div className="flex gap-2 ml-2">
              <PhoneIcon fontSize="small" sx={{ color: '#0f687e' }} />
              <p className="text-gray-600 text-sm">{phone || '+37477188936'}</p>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            {cvUrl && (
              <a
                href={`${config.BACK_URL}${cvUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[var(--primary)] text-[var(--itemColor)] px-4 py-2 rounded-lg shadow-sm w-fit max-w-full"
              >
                <span className="truncate font-medium">
                  {fullName}-ի CV-ն
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white shadow-md rounded-2xl p-6 my-6">
          <p className="text-[var(--primary)] font-bold text-3xl mb-5">Անձնական տվյալներ</p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[var(--primary)] font-bold">Քաղաք</p>
              <p className="text-lg font-medium ">{city || "—"}</p>
            </div>
            <div>
              <p className="text-[var(--primary)] font-bold">Սեռ</p>
              <p className="text-lg font-medium">{gender === "male" ? "Արական" : "Իգական"}</p>
            </div>
            <div>
              <p className="text-[var(--primary)] font-bold">Աշխատավարձ</p>
              <p className="text-lg font-medium">{salary?.toLocaleString()} ֏ / ամիս</p>
            </div>
            <div>
              <p className="text-[var(--primary)] font-bold">Մակարդակ</p>
              <p className="text-lg font-medium">միջին</p>
            </div>
            <div>
              <p className="text-[var(--primary)] font-bold">Ոլորտ</p>
              <p className="text-lg font-medium">{industryName|| "—"}</p>
            </div>
            <div>
              <p className="text-[var(--primary)] font-bold">Աշխատաժամանակի տեսակ</p>
              <p className="text-lg font-medium">{scheduleTypes[scheduleType]}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[var(--primary)] font-bold">Ինֆորմացիա</p>
              <p className="text-base mt-2 whitespace-pre-wrap text-gray-700 indent-2">{info?.info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleWorker;
