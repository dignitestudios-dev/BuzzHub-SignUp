import React, { useEffect } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LuLoader2 } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const RequestSuccessScreen = () => {
  const navigate = useNavigate();
  // const isStatus = "rejct";
  const { state } = useLocation();
  console.log("🚀 ~ RequestSuccessScreen ~ state:", state);

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
            <p className="text-[12px] text-secondary">
              Your request has been rejected! Please verify your identity again.
            </p>
            {/* <button className="bg-[#c00000] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#c00000cc]">
            Back to signup
          </button> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <IoCheckmarkCircle size={76} className="text-[#3CDC69] mx-auto" />
          </div>
          <div>
            <p className="text-[24px] font-semibold">Request approved</p>
          </div>
          <div className="px-24">
            <p className="text-[12px] text-secondary">
              Your request has been approved successfully!
            </p>
            {/* <button className="bg-[#c00000] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#c00000cc]">
          Back to signup
        </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestSuccessScreen;
