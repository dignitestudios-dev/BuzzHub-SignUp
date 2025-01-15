import axios from "../axios";
import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { ErrorToast } from "./Toaster";

const RequestSuccessScreen = () => {
  const navigate = useNavigate();
  // const isStatus = "rejct";
  const { state, rejectReason } = useLocation();

  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [subscription, setSubscription] = useState("");

  const createConnect = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const linkResponse = await axios.post("dispensary/create-account-link");

      if (linkResponse.status === 200) {
        setLoading(false);
        const accountLink = linkResponse.data.accountLink;
        window.location.href = accountLink;
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message || "Something went wrong");
      console.log("🚀 ~ handle stripe link ~ error:", error);
      setLoading(false);
    }
  };

  const getSubscriptionInfo = async () => {
    try {
      setInfoLoading(true);
      const linkResponse = await axios.get("dispensary/subscription-success");

      if (linkResponse.status === 200) {
        setInfoLoading(false);
        setSubscription(linkResponse?.data?.data);
      }
    } catch (error) {
      // ErrorToast(error?.response?.data?.message || "Something went wrong");
      console.log("🚀 ~ handle stripe link ~ error:", error);
      setInfoLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionInfo();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 relative">
      {state === "pending" ? (
        <div>
          <div className="flex justify-center items-center">
            <LuLoader2
              size={76}
              className="text-[#FFC107] animate-spin mx-auto"
            />
          </div>
          <div>
            <p className="text-[24px] font-semibold">Request pending...</p>
          </div>
          <div className="px-16">
            <p className="text-[12px] text-secondary">
              Your request is pending. We will email you once your request has
              been approved
            </p>
            {/* <button className="bg-[#c00000] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#c00000cc]">
            Back to signup
          </button> */}
          </div>
        </div>
      ) : state === "reject" ? (
        <div>
          <div className="flex justify-center items-center">
            <MdCancel size={76} className="text-[#FF3B30] mx-auto" />
          </div>
          <div>
            <p className="text-[24px] font-semibold">Request Rejected</p>
          </div>
          <div className="px-24">
            {rejectReason ? (
              <p> {rejectReason}</p>
            ) : (
              <p className="text-[12px] text-secondary">
                Your request has been rejected! Please verify your identity
                again.
              </p>
            )}
            <button
              onClick={() => navigate("/userinfo")}
              className="bg-[#FF3B30] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#c00000cc]"
            >
              Retry Submission
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 relative">
          {infoLoading ? (
            <FiLoader className="animate-spin text-lg mx-auto mt-1" />
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <FaRegCircleCheck size={76} color="#1D7C42" />
              </div>
              <div>
                <p className="text-[26px]">Congratulations</p>
              </div>
              <div>
                <p className="text-[20px]">
                  Your subscription has been activated successfully!
                </p>

                {/* <RiLoader3Line className="animate-spin mx-auto text-[42px]" /> */}
                <button
                  onClick={createConnect}
                  className="bg-[#0093c0] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#0093c0cc]"
                >
                  <div className="flex items-center">
                    <span className="mr-1">Create Connect Account</span>
                    {loading && (
                      <FiLoader className="animate-spin text-lg mx-auto mt-1" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestSuccessScreen;
