import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import { WishlistProvider } from "./components/context/WishlistContext"

function App() {
  return (
    <>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </WishlistProvider>
    </>
  )
}

export default App
