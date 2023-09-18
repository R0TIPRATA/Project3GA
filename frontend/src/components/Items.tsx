import Item from "./Item";
import { useWishList } from "./context/WishlistContext";


const Items = () => {
  const {wishlist} = useWishList()
  const getNumItems = () => {
    if(wishlist.wishlistItems) return wishlist.wishlistItems.length;
  }

  return (
    <div className="flex flex-col gap-8 justify-center bg-slate-50 p-10 rounded-3xl">
      <h2 className="p-2 inline-block pb-8">Wishlist Items ({getNumItems()})</h2>
      { wishlist.wishlistItems && 
        wishlist.wishlistItems.map( item => {
          return <Item key={item.uuid} {...item}/>
        })
      }
    </div>
  );
};

export default Items;
