import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
//

const Login = () => {
  const [searchParams] = new useSearchParams();
  const navigate = useNavigate();

  let queryParams = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  const [loadingScreen, setLoadingScreen] = useState(true);

  const handleTokenLogin = async () => {
    try {
      const { status, isSubscribed, token, isSessionComplete } = queryParams;
      console.log("🚀 ~ handleTokenLogin ~ status:", status);

      sessionStorage.setItem("token", token);

      if (isSessionComplete === "false") {
        // Navigate to /userinfo when isSessionComplete is false
        navigate("/userinfo");
      } else if (status === "Approved") {
        navigate("/req-success");
      } else if (status === "Pending") {
        navigate("/req-success", { state: "pending" });
        console.log("🚀 pending status:", status);
      } else if (isSubscribed === "false") {
        navigate("/packages", { state: "approve" });
      } else {
        navigate("/packages");
      }
    } catch (err) {
      console.log("🚀 ~ handleTokenLogin ~ err:", err);
      ErrorToast("User Not Found");
    } finally {
      setLoadingScreen(false);
    }
  };

  useEffect(() => {
    if (queryParams?.token) {
      handleTokenLogin();
    }
  }, [queryParams]);

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
