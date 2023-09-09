import Items from '../components/Items'
import AddItemForm from '../components/AddItemForm'
import WishListDetails from '../components/WishListDetails'

const WishlistPage = () => {

    return (
        <>
        <div className='wishlistPage bg-orange-100 flex-col pb-20'>
          <WishListDetails /> {/* wishlist details is the pink part of the home page */}
          <Items /> {/* the list of items */}
          <AddItemForm /> {/* add item form */}
        </div>
        </>
      )
}

export default WishlistPage