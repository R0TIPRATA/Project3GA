import Items from "../components/Items";
import AddItemForm from "../components/form/AddItemForm";
import WishListDetails from "../components/WishListDetails";
import EditItemForm from "../components/form/EditItemForm";
import { useRef } from "react";
import EditWishlistForm from "../components/form/EditWishlistForm";
import { useWishList } from "../components/context/WishlistContext";

const WishlistPage = () => {
  const drawerRef = useRef({} as HTMLInputElement);
  const {editFormType} = useWishList()

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="drawer drawer-end">
      <input
        id="edit-drawer"
        ref={drawerRef}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <div className="wishlistPage bg-orange-100 flex-col pb-20">
          <WishListDetails />
          <main className="parent flex my-10 mx-40 gap-8">
            <div className="col1 w-4/6">
              <Items />
            </div>
            <div className="col2 w-2/6">
              <AddItemForm />
            </div>
          </main>
        </div>
      </div>
        <div className="drawer-side">
          <label htmlFor="edit-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-1/3 min-h-full bg-base-200 text-base-content">
              {editFormType === "item" ? <EditItemForm closeDrawer={closeDrawer} /> : <EditWishlistForm closeDrawer={closeDrawer}/>} 
          </ul>
        </div>
    </div>
  );
};

export default WishlistPage;
