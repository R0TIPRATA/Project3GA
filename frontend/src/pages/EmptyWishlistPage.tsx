import AddWishlistForm from "../components/form/AddWishlistForm"
import { useRef } from "react";
import addwishlist_image from "../assets/addwishlist_image.png"

const EmptyWishlistPage = () => {

  const drawerRef = useRef({} as HTMLInputElement);

  const closeDrawer = () => {
    // Close the drawer by unchecking the checkbox
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }

  };

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-2" ref={drawerRef} type="checkbox" className="drawer-toggle" />
          <div className="drawer-content h-whole bg-orange-100">
            <div className="flex-col text-center my-40">
              <img src={addwishlist_image} alt="addwishlist image" className="h-52 w-60 mx-auto"/>
              <div className="my-6">You don't have any wishlists yet! Add a wishlist to begin.</div>
              <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button">Add wishlist</label>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-1/3 min-h-full bg-base-200 text-base-content">
              <AddWishlistForm closeDrawer={closeDrawer} />
            </ul>
          </div>
      </div>
    </div>
  )
}

export default EmptyWishlistPage