import React from "react";
import { FiLoader } from "react-icons/fi";

const CustomButton = ({ text, loading, type, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className="w-full h-[48px] bg-primary text-white rounded-[12px] flex items-center
       justify-center text-[14px] font-medium leading-[21.6px] tracking-[-0.24px]"
    >
      <div className="flex items-center">
        <span className="mr-1">{text}</span>
        {loading && <FiLoader className="animate-spin text-lg mx-auto mt-1" />}
      </div>
    </button>
  );
};

export default CustomButton;
