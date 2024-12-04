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

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route
        path="/login/:token/:isSubscribed/:isApproved/:isSessionComplete/:isVerified"
        element={<Login />}
      />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/success" element={<SuccessScreen />} />
      <Route path="/req-success" element={<RequestSuccessScreen />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
