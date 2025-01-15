import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RiLoader3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/userinfo");
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 relative">
      <div>
        <div className="flex justify-center items-center mb-10">
          <FaRegCircleCheck size={76} color="#1D7C42" />
        </div>
        <div>
          <p className="text-[28px] font-bold leading-[1.1]">Email & Phone <br/> Number Verified</p>
        </div>
        <div>
          <p className="text-[13px] text-[#5E5F62] mb-2 mt-2">
            Your email and Phone Number has <br/>been verified!
          </p>

          <RiLoader3Line className="animate-spin mx-auto text-[42px]" />
          {/* <button className="bg-[#c00000] p-2 rounded-lg text-[16px] text-white mt-3 hover:bg-[#c00000cc]">
            Back to signup
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
