// import { useNavigate } from "react-router-dom";
import { useWishList } from "./context/WishlistContext";

const Navbar = () => {
  const { userToken } = useWishList();

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="navbar bg-forest text-white">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Wishlist App</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            {userToken.username && <li><a className="text-white">Welcome, {userToken.username}!</a></li>}
            <li><a className="text-white">Wishlist</a></li>
            <li><a className="text-white">Recent Activity</a></li>
            {userToken.token && <li><a className="text-white" onClick={logoutHandler}>Logout</a></li>}
            </ul>
        </div>
    </div>
  )
}

export default Navbar