import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/Navbar/shop.jpg'

const Navbar = () => {
  const Nav = (
    <>
      <NavLink>Home</NavLink>
      <NavLink>About</NavLink>
      <NavLink>Home</NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Nav}
          </ul>
        </div>
        <div>
          <a className="sm:text-xl md:text-2xl flex justify-center items-center">
            <img className="w-16" src={logo} alt="" />
            <span className="text-sky-500">ShopSphere</span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-xl">{Nav}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/signin">
          <a className="btn">Sign-in</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
