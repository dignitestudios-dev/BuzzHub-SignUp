import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useNavigate, useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
//

const Login = () => {
  const { token, isSubscribed, isApproved, isSessionComplete, isVerified } =
    useParams();
  const decodedToken = decodeURIComponent(token);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleTokenLogin = async () => {
    try {
      if (response.status === 200) {
        if (response?.data?.data?.isEmailVerified === true) {
          sessionStorage.setItem("token", response?.data?.data?.token);
          if (response?.data?.data?.isSubscribed === true) {
            navigate("/update-plan");
          } else {
            navigate("/buy-package");
          }
        } else {
          navigate("/onboard-verify-otp", { state: decodedToken });
        }
        // navigate("/dashboard");
        setLoading(false);
        SuccessToast("Logged in successfully");
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
      window.close();
    } finally {
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleTokenLogin();
    }
  }, [token]);

  return (
    <div className="md:p-0 p-4 w-full h-screen flex items-center justify-center">
      {loadingScreen ? (
        <div className="flex justify-center items-center mt-10">
          <FiLoader className="text-primary text-[42px] opacity-40 animate-spin text-lg mx-auto" />
          <p className="text-primary text-[22px] opacity-40 text-lg mx-auto">
            Logging In...
          </p>
        </div>
      ) : (
        <div>
          <p className="text-[14px] lg:text-[16px] font-normal text-primary">
            ⓘ Please open the mobile app and try logging in again.
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
