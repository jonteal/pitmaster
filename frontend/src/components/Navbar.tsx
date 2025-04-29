import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed z-10">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Pit
        </Link>
      </div>
    </div>
  );
};
