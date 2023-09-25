import { useWishList } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const LoggedInNotif = () => {
  const { userToken } = useWishList();

  return (
    <div>
      {userToken.token && (
        <div className="h-12 bg-zinc-300 flex justify-center items-center">
          This is what your friends/family see when they want to contribute to
          your page. To edit your wishlist,
          <Link to="/" className="pl-1 underline">
            click here
          </Link>
          .
        </div>
      )}
    </div>
  );
};

export default LoggedInNotif;
