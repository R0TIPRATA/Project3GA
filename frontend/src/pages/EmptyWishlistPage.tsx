const EmptyWishlistPage = () => {
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content h-whole bg-orange-100">
            <div className="flex-col text-center my-80">
              <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto" />
              <div className="my-6">You don't have any wishlists yet! Add a wishlist to begin.</div>
              <button className="btn btn-primary">Add wishlist</button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default EmptyWishlistPage