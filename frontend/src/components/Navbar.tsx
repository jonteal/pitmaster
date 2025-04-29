import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Pit
        </Link>
      </div>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">
              <span className="text-xs font-mono mr-2">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/add">
              <span className="text-xs font-mono mr-2">Add</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-end"></div>
    </div>
  );
};
