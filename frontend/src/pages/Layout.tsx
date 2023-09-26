import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Toaster } from 'react-hot-toast'

const Layout = () => {
    return (
        <div className="App bg-orange-100 min-h-full">
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    )
}

export default Layout