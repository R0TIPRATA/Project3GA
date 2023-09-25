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

function App() {
  return (
    <>
    <WishlistProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/activity" element={<ActivityPage />} />
        <Route path="/:user" element={<ContributorPage />} />
        <Route path="/:user/:itemId" element={<PaymentPage />} /> 
        <Route path="/:user/:itemId/donate" element={<DonationPage />} /> 
        <Route path="/:user/:itemId/success" element={<SuccessPaymentPage />} />
      </Routes>
    </WishlistProvider>
    </>
  );
}

export default App;
