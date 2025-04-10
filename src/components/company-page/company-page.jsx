/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PlaceIcon from '@mui/icons-material/Place';
import Groups2Icon from '@mui/icons-material/Groups2';
import CallIcon from '@mui/icons-material/Call';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmailIcon from '@mui/icons-material/Email';
const CompanyPage = ({title,mail,logo,backgroundImage,phoneNumber,minWorkes,maxWorkes,description,location,industry}) => {
  return (
    <div className="containerCompany ">
        <div className="flex flex-col shadow-lg">
            <div className="w-full h-[350px] shadow-lg z-10 bg-[var(--itemColor)] border-1">
                <img className="w-full h-full" src={backgroundImage} alt={backgroundImage} />
            </div>
            <div className="w-full h-[125px] bg-[var(--itemColor)] border-1 flex">
                <div className="w-[150px] h-[150px] border-1 absolute z-20 left-50 bottom-45 bg-[var(--primary)]">
                    <img className="w-full h-full" src={logo} alt={title || "Անուն"} />
                </div>
                <div>
                    <p className="mt-10 ml-[200px] font-bold text-4xl">{title || "Ընկերության անունը"}</p>
                </div>
            </div>
        </div>
        <div className="flex gap-5 mt-5">
            <div className='flex flex-col w-2/3 gap-5'>
                <div className="bg-[var(--itemColor)] rounded-2 shadow-lg p-5 ">
                    <p className="font-bold text-2xl">Մեր մասին</p>
                    <p>{description || "Ընկերության մասին"}</p>
                </div>
                <div className='bg-[var(--itemColor)] flex flex-col gap-5 rounded-2 shadow-lg p-5'>
                    <p className='font-bold'> Աշխատանք {title || "Ընկերություն"}-ում</p>
                    
                </div>
            </div>
            <div className="flex w-1/3 bg-[var(--itemColor)] p-5 rounded-5 shadow-lg">
                    <div className="flex flex-col gap-5 ">
                        <div className='flex items-center gap-2'>
                            <PlaceIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className="font-bold">Հասցե</p>
                                <p>{location || "Հասցեն նշված չէ"}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <Groups2Icon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className="font-bold">Աշխատակիցների քանակ</p>
                                <p>{minWorkes && maxWorkes ? `${minWorkes}-${maxWorkes}` : "Աշխատակիցների քանակը նշված չէ"}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <CallIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className="font-bold">Հեռախոսահամար</p>
                                <p>{phoneNumber || "Հեռախոսահամարը նշված չէ"}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <BusinessCenterIcon sx={{ fontSize: 28, color: '#d1d5dc'  }}/>
                            <div>
                                <p className="font-bold">Ոլորտ</p>
                                <p>{industry || "Ոլորտը նշված չէ"}</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-2'>
                            <EmailIcon sx={{ fontSize: 28, color: '#d1d5dc' }}/>
                            <div>
                                <p className="font-bold text-gray-3">Էլ․ փոստ</p>
                                <p>{industry || "Էլ․ փոստը նշված չէ"}</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        
    </div>
  )
}

export default CompanyPage