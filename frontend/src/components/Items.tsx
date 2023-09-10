import { useContext } from "react"
import { WishlistContext } from "../pages/Home"
import Item from "./Item";

const getNumItems = () => {
  return 3; //to code this
}

//get all of the items in wishlist
//send props to items to display

const Items = () => {
  const wishlist = useContext(WishlistContext)
  return (
    <div className="flex-col justify-center bg-slate-50 p-10 rounded-3xl">
      <h2 className="p-2 inline-block pb-8">Wishlist Items ({getNumItems()})</h2>
      {/* {console.log("wishlist => ", JSON.stringify(wishlist,null,2))}
      {console.log("wishlist items => ", JSON.stringify(wishlistItems,null,2))} */}
      { wishlist.wishlistItems && 
        wishlist.wishlistItems.map( (item, index) => {
          return <Item key={index} {...item}/>
        })
      }
    </div>
  );
};

export default Items;
