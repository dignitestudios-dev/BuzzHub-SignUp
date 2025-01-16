import React, { useState } from "react";
import UserInformation from "../components/UserInformation";
import UserProfile from "../components/UserProfile";
import UserVerification from "../components/UserVerification";
import UserSummary from "./../components/UserSummary";
import { useForm } from "react-hook-form";
import axios from "../axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [closingTime, setClosingTime] = useState("");
  const [startingTime, setStartingTime] = useState("");

  const [cities, setCities] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [pickupType, setPickupType] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    watch,
  } = useForm();

  const [fileNames, setFileNames] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const [sections] = useState([
    "Information",
    "Profile",
    "Verification",
    "Summary",
  ]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleApiCall = async (formData) => {
    setLoading(true);
    try {
      // data
      const data = new FormData();
      data.append("dispensaryName", formData.dispensaryName);
      data.append("bio", formData.bio);
      data.append("city", city);
      data.append("country", formData.country);
      data.append("deliveryRadius", formData.deliveryRadius);
      data.append("closingHourTime", closingTime);
      data.append("openingHourTime", startingTime);
      data.append("fulfillmentMethod", pickupType);
      // data.append("pickupType", JSON.stringify(formData.pickupType)); // assuming it's an array
      data.append("state", selectedState);
      data.append("streetAddress", formData.streetAddress);
      data.append("zipCode", formData.zipCode);
      data.append(
        "location[coordinates]",
        JSON.stringify([
          coordinates?.coordinates?.lng,
          coordinates?.coordinates?.lat,
        ])
      );
      data.append("location[type]", "Point");

      // Append file data (if exists)
      if (formData.image[0]) {
        data.append("profilePicture", formData.image[0]);
      }
      if (fileNames.front) {
        data.append("licenseFront", fileNames.front);
      }
      if (fileNames.back) {
        data.append("licenseBack", fileNames.back);
      }
      if (fileNames.left) {
        data.append("registrationLicenseFront", fileNames.left);
      }
      if (fileNames.right) {
        data.append("registrationLicenseBack", fileNames.right);
      }

      const response = await axios.post(
        "dispensary/dispensary-complete-profile",
        data
      );
      if (response.status === 200) {
        setLoading(false);
        SuccessToast("Information Submitted");
        navigate("/req-success", { state: "pending" });
      }
    } catch (err) {
      console.log("🚀 ~ handleApiCall ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center bg-[#1d7c42] items-center h-full w-full  ">
      <div className="flex pt-5 gap-10">
        {sections.map((value, index) => (
          <div
            key={index}
            className="flex relative flex-col items-center justify-center w-full"
          >
            <div className="w-auto flex flex-col items-center gap-2">
              <div className="flex items-center ">
                <div
                  className={`md:w-12 md:h-12 w-[28.08px] h-[28.08px]  rounded-full flex items-center justify-center font-bold text-white ${
                    index < step - 1
                      ? "bg-white text-primary z-50"
                      : index === step - 1
                      ? "border-2 border-[white] bg-primary text-white z-50"
                      : "bg-white text-primary z-50 "
                  }`}
                >
                  <span
                    className={`font-[400] text-[12px] ${
                      index === step - 1 ? "text-white" : "text-primary"
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="flex justify-start items-center text-center text-sm">
                <p
                  className={`font-[400] text-[12px] ${
                    index <= step - 1 ? "text-white z-50" : "text-gray-300 z-50"
                  }`}
                >
                  {value}
                </p>
              </div>
            </div>
            {index < sections.length - 1 && (
              <div
                className={`absolute md:top-6 top-3 md:-right-8 -right-16 md:w-[41px] w-[90px] h-[2px] ${
                  index < step - 1 ? "bg-white" : "bg-gray-400"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="bg-[#f9FAFA] h-auto  w-[100%] mt-3 p-6 shadow-sm rounded-tr-[30px] rounded-t-[30px]">
          <div className="flex justify-between items-center mt-4 w-full"></div>
          {step === 1 && (
            <UserInformation
              handleNext={handleNext}
              setCoordinates={setCoordinates}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              handleSubmit={handleSubmit}
              watch={watch}
              cities={cities}
              setCities={setCities}
              city={city}
              setCity={setCity}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />
          )}
          {step === 2 && (
            <UserProfile
              handleNext={handleNext}
              handlePrev={handlePrev}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              control={control}
              watch={watch}
              setClosingTime={setClosingTime}
              startingTime={startingTime}
              setStartingTime={setStartingTime}
              setValue={setValue}
              pickupType={pickupType}
              setPickupType={setPickupType}
            />
          )}
          {step === 3 && (
            <UserVerification
              handleNext={handleNext}
              handlePrev={handlePrev}
              fileNames={fileNames}
              setFileNames={setFileNames}
            />
          )}
          {step === 4 && (
            <UserSummary
              handleApi={handleApiCall}
              handlePrev={handlePrev}
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              handleSubmit={handleSubmit}
              fileNames={fileNames}
              watch={watch}
              loading={loading}
              selectedState={selectedState}
              city={city}
              pickupType={pickupType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
