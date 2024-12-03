import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const InputField = ({
  placeholder,
  name,
  text,
  type,
  error,
  register,
  maxLength,
  isDisabled = false,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start  ">
      <div
        className={`w-full h-[56px] focus-within:border-[1px] rounded-[12px] bg-light shadow-sm 
             flex items-center justify-start  ${
               error
                 ? "focus-within:border-[#FF453A]"
                 : "focus-within:border-[#1D7C42]"
             } `}
      >
        <div
          className={` w-full  h-full flex items-center justify-center rounded-[12px] relative`}
        >
          <input
            disabled={isDisabled}
            type={isPassVisible ? "text" : type}
            placeholder={placeholder}
            className="w-full text-sm text-secondary placeholder:font-normal 
            font-normal px-4 lg:py-3 md:py-2 py-3 my-2 rounded-xl outline-none bg-light "
            {...register}
            maxLength={maxLength}
          />
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute top-4 text-lg right-2"
            style={{
              color: "#6B7373",
            }}
          >
            {type == "password" &&
              (!isPassVisible ? <BsEye /> : <BsEyeSlash />)}
          </button>
        </div>
      </div>
      {error && <p className="text-[#FF453A] text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
