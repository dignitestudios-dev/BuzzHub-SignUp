import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import moment from "moment";
import { Controller } from "react-hook-form";

const UserProfile = ({
  handleNext,
  handlePrev,
  watch,
  control,
  register,
  errors,
  handleSubmit,
  setClosingTime,
  setStartingTime,
  startingTime,
  setValue,
  setPickupType,
  pickupType,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    handleNext();
  };
  const deliveryRadiusValue = watch("deliveryRadius");

  const watchedPickupType = watch("pickupType", []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the uploaded image
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center text-[24px] font-[600] text-primary leading-[22px] mt-0">
        {imagePreview ? "Uploaded Image" : "Upload Image"}
      </p>
      <div className="w-full flex justify-center items-center mt-2">
        <div
          className="relative flex items-center justify-center w-[88px] h-[88px] mb-4  mt-4 border-2
         border-primary border-dashed bg-[#F6F6F6] rounded-full"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Uploaded Preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer my-1"
            // onChange={(e) => handleImageChange(e)}
            {...register("image", {
              required: "Please upload an image",
              onChange: (event) => handleImageChange(event),
            })}
          />
        </div>
      </div>
      {errors.image && (
        <p className="text-red-500 text-xs text-center">
          {errors.image.message}
        </p>
      )}

      <div className="w-full h-auto flex flex-col justify-start items-start mt-3">
        <textarea
          {...register("bio", {
            required: "Please enter bio",
          })}
          type="text"
          placeholder="Bio"
          className="w-full text-sm text-[#1D7C42] placeholder:text-black placeholder:font-normal h-[80px]
            font-medium px-4 lg:py-3 md:py-2 py-3  rounded-xl outline-none bg-light shadow-sm"
          maxLength={200}
        />
      </div>
      {errors.bio && (
        <p className="text-red-500 text-xs text-center mt-1">
          {errors.bio.message}
        </p>
      )}
      <div className="w-full h-auto flex justify-between items-center mt-1">
        <div className="w-full">
          <label className="text-[10px] text-secondary">Opening Hour</label>
          <Controller
            name="openingHour"
            control={control}
            rules={{
              required: "Closing time is required",
            }}
            render={({ field }) => (
              <input
                // id="opentime"
                {...field}
                type="time"
                value={
                  field.value
                    ? moment(field.value, "hh:mm A").format("HH:mm")
                    : ""
                }
                {...register("openingHour", {
                  required: "Opening time is required",
                  onChange: (e) => {
                    const formattedTimeWithDate = moment()
                      .set({
                        hour: moment(e.target.value, "HH:mm").hour(),
                        minute: moment(e.target.value, "HH:mm").minute(),
                        second: 0,
                      })
                      .toISOString();
                    setStartingTime(formattedTimeWithDate);
                    // setValue("closingHour", formattedTime);
                  },
                })}
                className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                 px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
              />
            )}
          />
          {errors.openingHour && (
            <p className="text-red-500 text-xs">{errors.openingHour.message}</p>
          )}
        </div>
        <div className="w-full">
          <label className="text-[10px] text-secondary">Closing Hour</label>
          <Controller
            name="closingHour"
            control={control}
            rules={{
              required: "Closing Hour is required",
            }}
            render={({ field }) => (
              <input
                // id="closetime"
                {...field}
                type="time"
                value={
                  field.value
                    ? moment(field.value, "hh:mm A").format("HH:mm")
                    : ""
                }
                {...register("closingHour", {
                  required: "Closing Hour is required",
                  validate: (value) => {
                    if (!startingTime) return true;
                    const closingTimeMoment = moment(value, "HH:mm");
                    const openingTimeMoment = moment(startingTime);
                    if (closingTimeMoment.isBefore(openingTimeMoment)) {
                      return "Closing hour must be after the opening hour";
                    }
                    return true;
                  },
                  onChange: (e) => {
                    const formattedTime = moment(
                      e.target.value,
                      "HH:mm"
                    ).format("hh:mm A");
                    const formattedTimeWithDate = moment()
                      .set({
                        hour: moment(e.target.value, "HH:mm").hour(),
                        minute: moment(e.target.value, "HH:mm").minute(),
                        second: 0,
                      })
                      .toISOString();
                    setClosingTime(formattedTimeWithDate);
                    // setValue("closingHour", formattedTime);
                  },
                })}
                // onChange={}
                className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
              />
            )}
          />
          {errors.closingHour && (
            <p className="text-red-500 text-xs">{errors.closingHour.message}</p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center rounded-[12px] p-3 items-start mt-3 bg-[#F3F3F3] h-[88px] ">
        <p className="text-[13px] font-[400] mb-3">
          Delivery Radius{" "}
          <span className="text-[13px]">({deliveryRadiusValue})</span>
        </p>

        <input
          type="range"
          className="range-input"
          {...register("deliveryRadius", {
            required:
              "Delivery radius cannot be zero. Please adjust the slider to select a valid radius",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Please enter a positive number greater than zero",
            },
          })}
        />

        {errors.deliveryRadius && (
          <p className="text-[#FF453A] text-sm">
            {errors.deliveryRadius.message}
          </p>
        )}

        {/* <InputField
          text={"Delivery Radius (Miles)"}
          placeholder={"Enter Radius in Miles"}
          type={"range"}
          error={errors.deliveryRadius}
          register={register("deliveryRadius", {
            required: "Delivery Radius is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Please enter a positive number greater than zero",
            },
          })}
        /> */}
      </div>
      <div className="mt-4 mx-1">
        <p className="text-[13px] font-[600]">Fulfillment Method</p>
        <div className="flex items-center my-2">
          <input
            {...register("pickupType", {
              required: "Please select a delivery option",
            })}
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Pickup"}
            onChange={() => {
              if (pickupType === "Both" || pickupType === "Deliver at home") {
                setPickupType("Pickup");
                setValue("pickupType", "Pickup");
              } else {
                setPickupType("Both");
                setValue("pickupType", "Both");
              }
            }}
          />
          <label className="text-[13px] ml-1">Self Pickup</label>
        </div>
        <div className="flex items-center my-2">
          <input
            {...register("pickupType", {
              required: "Please select a delivery option",
            })}
            onChange={() => {
              if (pickupType === "Both" || pickupType === "Pickup") {
                setPickupType("Deliver at home");
                setValue("pickupType", "Deliver at home");
              } else {
                setPickupType("Both");
                setValue("pickupType", "Both");
              }
            }}
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Deliver at home"}
          />
          <label className="text-[13px] ml-1">Deliver at home</label>
        </div>

        <div className="flex items-center my-2">
          <input
            {...register("pickupType", {
              required: "Please select a delivery option",
            })}
            onChange={() => {
              setPickupType("Both");
              setValue("pickupType", "Both");
            }}
            type="checkbox"
            className="w-[16px] h-[16px] accent-primary"
            checked={pickupType === "Both"}
          />
          <label className="text-[13px] ml-1">Both</label>
        </div>
        {errors.pickupType && (
          <p className="text-red-500 text-xs">{errors.pickupType.message}</p>
        )}
      </div>

      <div className="mt-8">
        <CustomButton text={"Next"} type="submit" />
      </div>
      <div className="">
        <button
          onClick={handlePrev}
          type="button"
          className="w-full h-[52px] text-primary rounded-[12px] flex items-center justify-center
   text-[13px] font-[600] leading-[17.55px]  tracking-[-0.24px] hover:text-[#000] hover:bg-[#f0f0f0] transition duration-300"
        >
          Go Back
        </button>
      </div>
    </form>
  );
};

export default UserProfile;
