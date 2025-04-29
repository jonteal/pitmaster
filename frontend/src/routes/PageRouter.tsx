import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";

export const PageRouter = () => (
  <Routes>
    <Route index element={<Home />} />
  </Routes>
);
