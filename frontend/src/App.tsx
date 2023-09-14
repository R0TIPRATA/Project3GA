import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import { WishlistProvider } from "./components/context/WishlistContext"
import Login from "./pages/LoginPage"
import SignUp from "./pages/SignUpPage"

function App() {
  return (
    <>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </WishlistProvider>
    </>
  )
}

export default App
