import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FiLoader } from "react-icons/fi";
//

const Login = () => {
  const [searchParams] = new useSearchParams();

  let queryParams = {};
  console.log("🚀 ~ Login ~ queryParams:", queryParams);

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  // const decodedToken = decodeURIComponent(token);

  const navigate = useNavigate();

  const [loadingScreen, setLoadingScreen] = useState(true);

  const handleTokenLogin = async () => {
    try {
      const { isVerified, status, isSubscribed, token } = queryParams;
      if (isVerified === "true") {
        console.log("decode token is: ", token);
        sessionStorage.setItem("token", token);
        if (status === "Approved") {
          if (isSubscribed === "true") {
            navigate("/req-success", { state: "approve" });
            console.log("is subscribe call");
          } else {
            navigate("/packages");
          }
        } else if (status === "Pending") {
          navigate("/req-success", { state: "pending" });
        } else {
          // navigate("/req-success", { state: "reject" });
          navigate("/userinfo");
        }
      } else {
        navigate("/verify-otp", { state: token });
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
