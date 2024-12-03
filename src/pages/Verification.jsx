import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoIosArrowDroprightCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { MdOutlinePhonelinkRing } from "react-icons/md";

const Verification = () => {
  const isTrue = false;
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="flex justify-center items-center w-full py-2">
        <div className="bg-[#F9FAFA] h-full lg:w-[30%] md:w-[50%] w-[94%] py-6 px-4 shadow-sm rounded-xl">
          <p className="text-center text-[28px] font-medium">Verification</p>
          <p className="text-center text-[13px] text-secondary">
            Verify your email and phone number
          </p>
          <div className="flex justify-between items-center bg-light rounded-xl py-6 px-2 mt-6">
            <div className="flex items-center pr-2 ">
              <FaEnvelope className="text-[#1D7C42] text-[30px]" />
              <div className="pl-4">
                <p className="text-[15px] text-[#575757] font-medium    ">
                  Email address
                </p>
                <p className="text-[12px] text-secondary">
                  design@dignitestudios.pk
                </p>
              </div>
            </div>
            {isTrue ? (
              <div>
                <IoMdCheckmarkCircle className="text-[#34C658] text-[32px]" />
              </div>
            ) : (
              <div>
                <IoIosArrowDroprightCircle className="text-[#1D7C42] text-[32px]" />
              </div>
            )}
          </div>
          <div className="flex justify-between items-center bg-light rounded-xl py-6 px-2 mt-4">
            <div className="flex items-center pr-2 ">
              <MdOutlinePhonelinkRing className="text-[#1D7C42] text-[30px]" />
              <div className="pl-4">
                <p className="text-[15px] text-[#575757] font-medium    ">
                  Phone Number
                </p>
                <p className="text-[13px] text-secondary">+1 695 201 794</p>
              </div>
            </div>
            {isTrue ? (
              <div>
                <IoMdCheckmarkCircle className="text-[#34C658] text-[32px]" />
              </div>
            ) : (
              <div>
                <IoIosArrowDroprightCircle className="text-[#1D7C42] text-[32px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
