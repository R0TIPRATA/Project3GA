import Items from "../components/Items";
import AddItemForm from "../components/AddItemForm";
import WishListDetails from "../components/WishListDetails";

const WishlistPage = () => {
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <div className="wishlistPage bg-orange-100 flex-col pb-20">
            <WishListDetails />{" "}
            {/* wishlist details is the pink part of the home page */}
            <Items /> {/* the list of items */}
            <AddItemForm /> {/* add item form */}
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <AddItemForm />
          </ul>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
