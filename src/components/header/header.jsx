import "./header.css"; 
import AppLogo from "../logo/logo";
// import { Language } from "@mui/icons-material";
import NavItem from "./nav-item";
import { Link } from "react-router-dom";

const AppHeader = () => {

  return (
    <div
      className={`flex  bg-[var(--primary)] items-center h-[70px] w-full shadow-[0px_3px_28.3px_0px_rgba(0,0,0,0.25)] transition-all duration-300 z-50 sticky top-0`}
    >
      <div className="container">
        <div className="flex justify-between">
          <div className="flex gap-[30px]">
            <Link to="/">
              <AppLogo />
            </Link>
            <ul className="flex align-center justify-center gap-[30px]">
              <NavItem text="Աշխատանք" href="/jobs" />
              <NavItem text="Ընկերություններ" href="/companies" activeStyle={{textDecoration: "underline"}}/>
              <NavItem text="Աշխատակիցներ" href="/workers" />
              {/* <NavItem text="Մեր մասին" href="/about" /> */}
            </ul>
          </div>
          <div>
            <ul className="flex align-center justify-center gap-[20px]">
              <NavItem text="Գրանցվել" href="/sign-up" />
              <NavItem text="Մուտք գործել" href="sign-in" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
