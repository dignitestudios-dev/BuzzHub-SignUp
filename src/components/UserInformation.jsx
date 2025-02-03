import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import SelectField from "./SelectField";
import stateCityData from "../dataCountry/CountryData";
// const stateCityData = {
//   California: ["Los Angeles", "San Francisco", "San Diego"],
//   Texas: ["Houston", "Dallas", "Austin"],
//   "New York": ["New York City", "Buffalo", "Rochester"],
// };

const UserInformation = ({
  handleNext,
  register,
  errors,
  setValue,
  handleSubmit,
  cities,
  setCities,
  city,
  setCity,
  selectedState,
  setSelectedState,
  coordinates,
  setCoordinates,
}) => {
  const [coordinatesMessage, setCoordinatesMessage] = useState(null);
  const apiFields = [
    {
      key: "dispensaryName",
      label: "Dispensary Name",
      placeholder: "Dispensary name",
      type: "text",
      validation: { required: "Please enter the dispensary name." },
      onInput: (e) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
      },
    },
    {
      key: "streetAddress",
      label: "Street Address",
      placeholder: "Street address",
      type: "text",
      validation: { required: "Please enter the street address." },
    },
    {
      key: "apartmentOrSuite",
      label: "Apartment or Suite",
      placeholder: "Apartment or Suite",
      type: "text",
      validation: {},
    },
    {
      key: "country",
      label: "Country",
      placeholder: "Enter country",
      type: "text",
      validation: { required: "Please enter the country." },
      disabled: true,
    },
  ];

  const onSubmit = () => {
    if (Object.keys(coordinates).length === 0) {
      setCoordinatesMessage("Please select a valid information");
      return;
    }
    handleNext();
  };

  // Handle state change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    setCities(stateCityData[selectedState] || []);
    setSelectedState(selectedState);
    // setValue("city", "");
  };

  useEffect(() => {
    const nameValue = "USA";
    if (nameValue) setValue("country", nameValue);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apiFields.map((field, i) => {
        return (
          <div
            key={field.key}
            className="w-full h-auto flex flex-col justify-start items-start my-4"
          >
            <InputField
              setCoordinates={setCoordinates}
              setCoordinatesMessage={setCoordinatesMessage}
              coordinatesMessage={coordinatesMessage}
              text={field.label}
              placeholder={field.placeholder}
              type={field.type}
              keyname={field.key}
              index={i}
              error={errors[field.key]}
              register={register(field.key, field.validation)}
              isDisabled={field?.disabled ? field?.disabled : ""}
              onInput={field.onInput && field.onInput}
            />
          </div>
        );
      })}

      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <SelectField
          value={selectedState}
          handleChange={handleStateChange}
          label="State"
          name="state"
          options={Object.keys(stateCityData)}
          error={errors.state?.message}
          disabled={false}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <SelectField
          value={city}
          handleChange={(e) => setCity(e.target.value)}
          label="City"
          name="city"
          options={cities}
          error={errors.city?.message}
          disabled={cities?.length === 0}
        />
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <InputField
          placeholder={"Enter zip code"}
          type={"text"}
          error={errors?.zipCode}
          register={register("zipCode", {
            required: "Please enter your zip code.",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "Zip code must be 5 digits.",
            },
          })}
          maxLength={5}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      <div className="pt-2">
        <CustomButton text={"Next"} type="submit" />
      </div>
    </form>
  );
};

export default UserInformation;
