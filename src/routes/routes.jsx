import Signup from "../pages/SignUp";
import VerifyOtp from "../pages/VerifyOtp";
import SuccessScreen from "../components/SuccessScreen";
import UserInfo from "../pages/UserInfo";
import Verification from "../pages/Verification";

export const OnboardingRoutes = [
  {
    title: "Signup",
    url: "/signup",
    page: <Signup />,
  },
  {
    title: "Verification",
    url: "/verification",
    page: <Verification />,
  },
  {
    title: "Verify OTP",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "Success",
    url: "/success",
    page: <SuccessScreen />,
  },
  {
    title: "User Info",
    url: "/userinfo",
    page: <UserInfo />,
  },
];
