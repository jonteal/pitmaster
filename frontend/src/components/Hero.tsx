import { Link } from "react-router-dom";
export const Hero = () => (
  <div className="hero bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Your Pit</h1>
        <p className="py-6 text-3xl">Here is a list of your recipes!</p>
        <Link className="btn btn-primary" to="/add">
          Add a new recipe
        </Link>
      </div>
    </div>
  </div>
);
