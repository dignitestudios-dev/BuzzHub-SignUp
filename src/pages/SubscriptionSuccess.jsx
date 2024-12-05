import axios from "../axios";
import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { RiLoader3Line } from "react-icons/ri";

const SubscriptionSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen text-center gap-4 relative">
      <div>
        <div className="flex justify-center items-center">
          <FaRegCircleCheck size={76} color="#1D7C42" />
        </div>
        <div>
          <p className="text-[26px]">Congratulations</p>
        </div>
        <div>
          <p className="text-[20px]">
            You have successfully registered dispensary
          </p>

          <p className="text-[14px] lg:text-[16px] font-normal text-primary">
            ⓘ Please open the mobile app to continue.
          </p>

          {/* <RiLoader3Line className="animate-spin mx-auto text-[42px]" /> */}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
