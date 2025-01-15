import React from "react";

const PageNotFound = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#001229]">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 gap-6 text-center">
        <h1 className="text-[36px] lg:text-[48px] font-bold text-white leading-[48px] lg:leading-[64.8px] tracking-[-1.2px]">
          Page Not Found!
        </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
