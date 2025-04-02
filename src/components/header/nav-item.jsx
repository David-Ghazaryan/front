import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const NavItem = ({ text, href }) => {
  return (
    <li className="text-[20px] font-medium font-poppins text-white relative">
      <Link
        className="hover:no-underline relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:rounded-full after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
        to={href}
      >
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
