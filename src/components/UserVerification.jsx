import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CustomButton from "./CustomButton";

const UserVerification = ({
  handleNext,
  handlePrev,
  fileNames,
  setFileNames,
}) => {
  console.log("🚀 ~ fileNames:", fileNames);
  // const fileName = false;

  const [errors, setErrors] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes

    if (file && !allowedTypes.includes(file.type)) {
      return "Only JPG and PNG files are allowed";
    }
    if (file && file.size > maxSize) {
      return "File size must be less than 20MB";
    }
    return ""; // No error
  };

  const handleFileChange = (e, position) => {
    const file = e.target.files[0];
    const error = validateFile(file);

    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [position]: error,
      }));
      setFileNames((prevFileNames) => ({
        ...prevFileNames,
        [position]: "", // Clear the file name if validation fails
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [position]: "", // Clear the error if validation passes
      }));
      setFileNames((prevFileNames) => ({
        ...prevFileNames,
        [position]: file,
      }));
    }
  };

  const validateForNext = () => {
    const missingImages = Object.values(fileNames).some(
      (fileName) => !fileName
    );
    if (missingImages) {
      setErrors((prevErrors) => ({
        front: !fileNames.front ? "Front image is required" : "",
        back: !fileNames.back ? "Back image is required" : "",
        left: !fileNames.left ? "Front image is required" : "",
        right: !fileNames.right ? "Back image is required" : "",
      }));
      return; // Prevent going to the next step if any image is missing
    }

    handleNext();
  };

  return (
    <div className="w-full h-full">
      <div className="py-2">
        <p className="text-[12px] font-medium">License</p>
      </div>
      <div className="flex justify-center">
        <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
          {fileNames.front ? (
            <img
              src={fileNames.front ? URL.createObjectURL(fileNames.front) : ""}
              className="w-[320px] h-[135px] rounded-lg object-cover"
              onLoad={() => URL.revokeObjectURL(fileNames.front)}
            />
          ) : (
            <label className="text-sm text-primary font-medium text-center">
              Upload Image
              <br />
              <div className="mt-2 text-center">
                {/* <p className="text-sm text-gray-700 w-52 overflow-hidden text-ellipsis">
                  Selected File:{" "}
                </p> */}
              </div>
              <>
                <span className="text-xs font-[400] text-gray-500">Front</span>
                <br />
                <span className="text-xs font-[400]  text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </>
            </label>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "front")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {errors.front && (
        <p className="text-xs text-red-500 text-center">{errors.front}</p>
      )}

      <div className="flex justify-center pt-2">
        <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
          {fileNames.back ? (
            <img
              src={fileNames.back ? URL.createObjectURL(fileNames.back) : ""}
              className="w-[320px] h-[135px] rounded-lg object-cover"
              onLoad={() => URL.revokeObjectURL(fileNames.back)}
            />
          ) : (
            <label className="text-sm text-primary font-medium text-center">
              Upload Image
              <br />
              <div className="mt-2 text-center">
                {/* <p className="text-sm text-gray-700 w-52 overflow-hidden text-ellipsis">
                  Selected File:{" "}
                </p> */}
              </div>
              <>
                <span className="text-xs font-[400] text-gray-500">Back</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </>
            </label>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "back")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {errors.back && (
        <p className="text-xs text-red-500 text-center">{errors.back}</p>
      )}
      <div className="py-2">
        <p className="text-[12px] font-[500] mt-3 mb-3">Registration</p>
      </div>
      <div className="flex justify-center">
        <div className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative">
          {fileNames.left ? (
            <img
              src={fileNames.left ? URL.createObjectURL(fileNames.left) : ""}
              className="w-[320px] h-[135px] rounded-lg object-cover"
              onLoad={() => URL.revokeObjectURL(fileNames.left)}
            />
          ) : (
            <label className="text-sm text-primary font-medium text-center">
              Upload Image
              <br />
              <div className="mt-2 text-center">
                {/* <p className="text-sm text-gray-700 w-52 overflow-hidden text-ellipsis">
                  Selected File:{" "}
                </p> */}
              </div>
              <>
                <span className="text-xs font-[400] text-gray-500">Front</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </>
            </label>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "left")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {errors.left && (
        <p className="text-xs text-red-500 text-center">{errors.front}</p>
      )}
      <div className="flex justify-center py-2">
        <div
          className="w-[330px] h-[140px] bg-white border-dashed border-2 border-primary
         cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center relative"
        >
          {fileNames.right ? (
            <img
              src={fileNames.right ? URL.createObjectURL(fileNames.right) : ""}
              className="w-[320px] h-[135px] rounded-lg object-cover"
              onLoad={() => URL.revokeObjectURL(fileNames.right)}
            />
          ) : (
            <label className="text-sm text-primary font-medium text-center">
              Upload Image
              <br />
              <div className="mt-2 text-center">
                {/* <p className="text-sm text-gray-700 w-52 overflow-hidden text-ellipsis">
                  Selected File:{" "}
                </p> */}
              </div>
              <>
                <span className="text-xs font-[400] text-gray-500">Back</span>
                <br />
                <span className="text-xs font-[400] text-gray-500">
                  Up to 20mb JPG, PNG
                </span>
              </>
            </label>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "right")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
      {errors.right && (
        <p className="text-xs text-red-500 text-center">{errors.back}</p>
      )}
      <div className="pt-6">
        <CustomButton
          text={"Next"}
          type="button"
          handleClick={validateForNext}
        />
      </div>
      <div className="mt-2">
        <button
          onClick={handlePrev}
          type="button"
          className="w-full h-[52px] text-primary rounded-[12px] flex items-center justify-center
   text-[13px] font-bold leading-[21.6px] tracking-[-0.24px] hover:text-[#000] hover:bg-[#f0f0f0] transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserVerification;
