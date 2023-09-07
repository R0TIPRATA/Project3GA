import Items from '../components/Items'
import AddItemForm from '../components/AddItemForm'
import WishListDetails from '../components/WishListDetails'

const WishlistPage = () => {

    return (
        <>
        <WishListDetails /> {/* wishlist details is the pink part of the home page */}
        <Items /> {/* the list of items */}
        <AddItemForm /> {/* add item form */}
        </>
      )
}

export default WishlistPage