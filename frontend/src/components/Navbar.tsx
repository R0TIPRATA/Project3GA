import { Link, useNavigate } from "react-router-dom";
import { useWishList } from "./context/WishlistContext";
import { useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const { userToken, setUserToken, notifySuccess } = useWishList();
  const navigate = useNavigate();

  const logoutHandler = () => {
    try {
      axios({
        method: "GET",
        url: "http://localhost:15432/users/logout",
        withCredentials: true
      }).then((response) => {
        notifySuccess(response.data.message);
        setUserToken({
          username: null,
          loggedInStatus: false
        })
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(()=>{
    console.log("user token" + JSON.stringify(userToken))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userToken])

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
          {userToken.loggedInStatus && (
            <li>
              <Link className="text-white" to="/">Wishlist</Link>
            </li>
          )}
          {userToken.loggedInStatus && (
            <li>
              <Link className="text-white" to="/activity">Recent Activity</Link>
            </li>
          )}
          {userToken.loggedInStatus && (
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
