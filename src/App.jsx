import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import VerifyOtp from "./pages/VerifyOtp";
import SuccessScreen from "./components/SuccessScreen";
import UserInfo from "./pages/UserInfo";
import Packages from "./pages/Packages";
import Verification from "./pages/Verification";
import RequestSuccessScreen from "./components/RequestSuccessScreen";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import CancelSubscription from "./pages/CancelSubscription";
import CancelScreen from "./pages/CancelScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/verify-success" element={<SuccessScreen />} />
      <Route path="/subscribe-success" element={<SubscriptionSuccess />} />
      <Route path="/req-success" element={<RequestSuccessScreen />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/cancel-subscription" element={<CancelSubscription />} />
      <Route path="/cancelled-screen" element={<CancelScreen />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
