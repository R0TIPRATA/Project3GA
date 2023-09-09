import Items from "../components/Items";
import AddItemForm from "../components/form/AddItemForm";
import WishListDetails from "../components/WishListDetails";
import EditItemForm from "../components/form/EditItemForm";

const WishlistPage = () => {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="wishlistPage bg-orange-100 flex-col pb-20">
          <WishListDetails />
            <main className="parent flex my-10 mx-10 gap-24">
              <div className="col1 w-3/4">
                <Items /> 
              </div>
              <div className="col2 w-1/4">
                <AddItemForm />
              </div>
            </main>
        </div>
      </div>  
      <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <EditItemForm />
          </ul>
        </div>
    </div>  
  );
};

export default WishlistPage;
