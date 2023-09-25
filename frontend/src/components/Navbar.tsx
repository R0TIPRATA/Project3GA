import { Link, useNavigate } from "react-router-dom";
import { useWishList } from "./context/WishlistContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { userToken } = useWishList();
  const navigate = useNavigate();
  const [isLoginUser, setIsLoginUser] = useState(false)

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(()=>{
    console.log("user token" + JSON.stringify(userToken))
    userToken ? setIsLoginUser(true):setIsLoginUser(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isLoginUser])

  return (
    <div className="navbar bg-forest text-white">
      <div className="flex-1">
        <a className="text-white normal-case text-xl ml-10 pointer-events-none">
          Wishlist App
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {userToken.username && (
            <li>
              <a className="text-lime-200 pointer-events-none">
                Welcome, {userToken.username}!
              </a>
            </li>
          )}
          {userToken.token && (
            <li>
              <Link className="text-white" to="/">Wishlist</Link>
            </li>
          )}
          {userToken.token && (
            <li>
              <Link className="text-white" to="/activity">Recent Activity</Link>
            </li>
          )}
          {userToken.token && (
            <li>
              <a className="text-white" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
