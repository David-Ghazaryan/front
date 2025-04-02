/* eslint-disable react/prop-types */
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import AppLogo from '../logo/logo';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
const ListTitle =({title})=>{
    return(
        <p  className="font-bold text-[20px] text-[var(--light)]"> {title}</p>
    )
}
const ListLink =({text,href})=>{
    return(<li className=" hover:no-underline relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[1px] after:bg-white after:rounded-full after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full  text-[14px] text-[var(--light)] pt-[15px]"><Link to={href}>{text}</Link></li>)
    
}
const AppFooter = ()=>{
    return(
        <div className=" bg-[var(--primary)] w-full h-[300px]  pt-[50px] ">
            <div className="container ">
                <div className=' flex justify-between border-b-[var(--light)] border-b pb-5'>
                    <div className=" flex gap-[80px]">
                        <div className="">
                            <ListTitle title={"Թեկնածուներ"}/>
                            <ul >
                                <ListLink text={"Աշխատանքներ"} href="/jobs"/>
                                <ListLink text={"Ընկերություններ"} href="/companies"/>
                                <ListLink text={"Օնլայն ռեզյումե"} href="/resume-builder"/>
                                <ListLink text={"Մեր մասին"} href="/about"/>
                            </ul>
                        </div>
                        <div className="">
                            <ListTitle title={"Գործատուներ"}/>
                            <ul >
                                <ListLink text={"Գրանցում"} href="/sign-up"/>
                                <ListLink text={"Տեղադրել աշխատանք"}/>
                                <ListLink text={"Աշխատակիցներ"} href="/workers"/>
                            </ul>
                        </div>
                    </div>
                    <div className='flex gap-[30px]'>
                        <div>
                            <AppLogo/>
                        </div>
                        <div>
                            <ul className='flex flex-col gap-[15px]'>
                                <li >
                                    <div className='flex gap-1'>
                                        <PhoneIcon sx={{ color: 'var(--light)' }} />    
                                        <a href="tel:+37477777888" className='text-[var(--light)]'>+374 77 777 888</a>
                                    </div>
                                </li>
                                <li >
                                    <div className='flex gap-1'>
                                        <EmailIcon sx={{ color: 'var(--light)'}}/>
                                        <a href='https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRmVpbWmRMzCKVHvLPJZBZRZRhqqtFQbgXWNbcvVKbnZbSVLgPDRCTvQDdznXVcdPkPqSLB' target='_blank' rel="noopener noreferrer" className='text-[var(--light)]'>gorcuxi@gmail.com</a>
                                    </div>
                                </li>
                                <li>
                                    <div  className='flex gap-1'>
                                        <LocationOnIcon sx={{ color: 'var(--light)'}}/> 
                                        <a href='https://www.google.com/maps/place/14+%D4%B9%D5%B8%D6%82%D5%B4%D5%A1%D5%B6%D5%B5%D5%A1%D5%B6+%D6%83%D5%B8%D5%B2%D5%B8%D6%81,+%D4%B5%D6%80%D6%87%D5%A1%D5%B6+0001/@40.1804328,44.5206034,633m/data=!3m2!1e3!4b1!4m6!3m5!1s0x406abce569aac7bb:0x8e7a11b198bbea4f!8m2!3d40.1804328!4d44.5206034!16s%2Fg%2F11c5l1_nc8?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D' target='_blank' rel="noopener noreferrer" className='text-[var(--light)]'>14 Tumanyan, Yerevan, Armenia </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
export default AppFooter;