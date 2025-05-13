import { NavLink } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const NavItem = ({ text, href }) => {
  return (
    <li className="text-[20px] font-medium font-poppins text-white relative">
      <NavLink
        to={href}
        className={({ isActive }) =>
          `relative after:content-[''] after:absolute after:bottom-[-4px] after:h-[2px] after:bg-white after:rounded-full after:transition-all after:duration-300 
          ${isActive ? 'after:left-0 after:w-full' : 'after:left-1/2 after:w-0 hover:after:left-0 hover:after:w-full'}`
        }
      >
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
