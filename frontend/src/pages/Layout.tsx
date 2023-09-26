import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="App bg-orange-100 min-h-full">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
