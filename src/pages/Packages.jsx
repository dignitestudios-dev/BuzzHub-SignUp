import React from "react";
import { IoCheckbox } from "react-icons/io5";
import CustomButton from "../components/CustomButton";
import { checkIcon } from "../assets/export";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();

  const handleNavigate = (plan) => {
    navigate("/add-card", { state: plan });
  };
  return (
    <div>
      <p className="text-center font-[600] my-12 text-[22px]">Select Package</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:px-56 lg:px-[60px] px-2">
        <div
          className="overflow-auto shadow-customShadow rounded-xl p-6 md:mb-0 min-h-[210px] 
        max-h-[300px] md:min-h-[290px] md:max-h-[400px] bg-secondary "
        >
          <div>
            <div className="flex flex-col justify-center items-center px-2">
              <p className="text-lg font-medium">For 3 Months</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$250</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <CustomButton
              text="Buy Subscription"
              type="button"
              handleClick={() => handleNavigate("basic")}
            />
          </div>
        </div>
        <div className="overflow-auto shadow-customShadow rounded-xl p-6 md:mb-0 min-h-[210px] max-h-[300px] bg-secondary ">
          <div>
            <div className="flex flex-col justify-center items-center px-2">
              <p className="text-lg font-medium">For 6 Months</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$550</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <CustomButton
              text="Buy Subscription"
              type="button"
              handleClick={() => handleNavigate("standard")}
            />
          </div>
        </div>
        <div className="overflow-auto shadow-customShadow rounded-xl p-6 md:mb-0 mb-1 min-h-[210px] max-h-[300px] bg-secondary ">
          <div>
            <div className="flex flex-col justify-center items-center px-2">
              <p className="text-lg font-medium">For a Year</p>
              <p className="text-[28px] font-bold text-[#1D7C42]">$800</p>
            </div>
            <div className="flex justify-center items-center">
              <ul className="mt-2 mb-6 space-y-1 ">
                {[...Array(3)].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[18px]  ">
                    <IoCheckbox className="text-[16px] text-[#1D7C42] mr-2" />
                    {/* <img src={checkIcon} /> */}
                    <p className="text-[12px] md:text-[16px] text-gray-700">
                      Lorem ipsum dolor sit amet
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <CustomButton
              text="Buy Subscription"
              type="button"
              handleClick={() => handleNavigate("premium")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
