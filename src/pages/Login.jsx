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
  console.log("🚀 ~ Login ~ decodedToken:", decodedToken);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const handleTokenLogin = async () => {
    try {
      if (isVerified === "true") {
        console.log("decode token is: ", decodedToken);
        sessionStorage.setItem("token", decodedToken);
        if (isApproved === "true") {
          navigate("/req-success", { state: "pending" });
        } else {
          if (isSubscribed === "true") {
            navigate("/req-success", { state: "approve" });
            console.log("is subscribe call");
          } else {
            console.log("is subscribe else call");
            navigate("/packages");
          }
        }
      } else {
        console.log("is verified else call");
        navigate("/verify-otp", { state: decodedToken });
      }
      // navigate("/dashboard");
      setLoading(false);
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast("User Not Found");
    } finally {
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      handleTokenLogin();
    }
  }, [decodedToken]);

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
