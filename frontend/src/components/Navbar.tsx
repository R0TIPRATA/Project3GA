
const Navbar = () => {
  return (
    <div className="navbar bg-forest text-white">
        <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Wishlist App</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><a className="text-white">Wishlist</a></li>
            <li><a className="text-white">Recent Activity</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar