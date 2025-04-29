import { Outlet } from "react-router-dom";
import "./App.css";

export const App = () => {
  return (
    <div className="h-screen w-full m-0">
      <Outlet />
    </div>
  );
};
