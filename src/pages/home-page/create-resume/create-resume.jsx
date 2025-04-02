import { Link } from "react-router-dom";
const CreateResume=()=>{
    return(
        <div>
            <div className="container flex items-center justify-between">
                <div >
                    <p className="font-bold text-[var(--primary)] text-[16px] pb-[15px]">ՕՆԼԱՅՆ ՌԵԶՅՈՒՄԵԻ ՍՏԵՂԾՄԱՆ ՀԱՐԹԱԿ</p>
                    <p className="text-[#1E2532] text-[14px] pl-[15px] pb-[30px]">Այս ամսվա ընթացքում ստեղծվել է ավելի քան 100 ռեզյումե</p>
                    <p className="font-bold text-[var(--primary)] text-[16px] pb-[15px]">ՍՏԵՂԾԵՔ ՕՆԼԱՅՆ ՌԵԶՅՈՒՄԵ</p>
                    <p className="text-[#1E2532] text-[14px] pl-[15px] pb-[30px]">Ստեղծեք պրոֆեսիոնալ ռեզյումե հեշտությամբ՝ օգտագործելով մեր <br /> պարզ և հարմարավետ ձևանմուշը։ Լրացրեք Ձեր տվյալները և ներբեռնեք <br /> պատրաստի ռեզյումեն րոպեների ընթացքում։</p>
                    <div className="bg-[var(--primary)] w-[180px] h-[60px] flex items-center justify-center rounded-[5px] hover:shadow-xl transition duration-150 cursor-pointer">
                        <Link className="font-bold text-[13px] text-white" to={'/resume-builder'}>Ստեղծեք ռեզյումե</Link>
                    </div>
                </div>
                <div>
                    <img src="src/assets/images/create-resume-photo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default CreateResume;