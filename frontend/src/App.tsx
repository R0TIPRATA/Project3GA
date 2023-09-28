import {Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import { WishlistProvider } from "./components/context/WishlistContext"
import Login from "./pages/LoginPage"
import SignUp from "./pages/SignUpPage"
import ContributorPage from "./pages/ContributorPage"
import PaymentPage from "./pages/PaymentPage"
import SuccessPaymentPage from "./pages/SuccessPaymentPage"
import DonationPage from "./pages/DonationPage"
import MessagesPage from "./pages/MessagesPage"
import ActivityPage from "./pages/ActivityPage"
import Layout from "./pages/Layout"
import ClosePage from "./pages/ClosePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <>
    <WishlistProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/wishlist/:user" element={<ContributorPage />} />
        <Route path="/wishlist/:user/:itemId" element={<PaymentPage />} /> 
        <Route path="/wishlist/:user/:itemId/donate" element={<DonationPage />} /> 
        <Route path="/wishlist/:user/:itemId/success" element={<SuccessPaymentPage />} />
        <Route path="/close" element={<ClosePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
      </Routes>
    </WishlistProvider>
    </>
  );
}

export default App;
