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
  getRemoteConfigData,
  
}) => {
  const [coordinatesMessage, setCoordinatesMessage] = useState(null);
  
  const [stateError, setStateError] = useState(null);
const [legalStates, setLegalStates] = useState([]);
console.log("legalStates--> ", legalStates);


useEffect(() => {
  const nameValue = "USA";
  if (nameValue) setValue("country", nameValue);

  const fetchLegalStates = async () => {
    const data = await getRemoteConfigData();
    if (Array.isArray(data)) setLegalStates(data);
  };

  fetchLegalStates();
}, [setValue]);


const handleStateChange = (e) => {
  const selected = e.target.value;

  if (!legalStates.includes(selected)) {
    setStateError("This state is not legal.");
    return;
    
  }

  setStateError(null);
  setCities(stateCityData[selected] || []);
  setSelectedState(selected);
};


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
    // {
    //   key: "apartmentOrSuite",
    //   label: "Apartment or Suite",
    //   placeholder: "Apartment or Suite",
    //   type: "text",
    //   validation: {},
    // },
    {
      key: "country",
      label: "Country",
      placeholder: "Enter country",
      type: "text",
      validation: { required: "Please enter the country." },
      disabled: true,
    },
  ];


const getStateFromPlace = (place) => {
    console.log("place61-->", place);

  const component = place.address_components.find((comp) =>
    comp.types.includes("administrative_area_level_1")
  );

  const componentCity = place.address_components.find((comp) =>
    comp.types.includes("locality")
  );
  
   if(!legalStates?.includes(component.long_name)){
      setStateError("The Illegal State cant be selected and wont appear in the field");
      return;
    }
      setStateError(null);
  setCities(stateCityData[component.long_name] || []);
  setSelectedState(component.long_name);
  setCity(componentCity ? componentCity.long_name : "");
  
};


  const onSubmit = () => {
    if (Object.keys(coordinates).length === 0) {
      setCoordinatesMessage("Please select a valid location");
      return;
    }
    handleNext();
  };

  // Handle state change
  // const handleStateChange = (e) => {
  //   const selectedState = e.target.value;

  //   setCities(stateCityData[selectedState] || []);
  //   setSelectedState(selectedState);
  //   // setValue("city", "");
  // };

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
                            getStateFromPlace={getStateFromPlace}

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
          disabled={true}
        />
          {stateError && <p className="text-red-500 text-sm">{stateError}</p>}

      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start my-4">
        <SelectField
          value={city}
          handleChange={(e) => setCity(e.target.value)}
          label="City"
          name="city"
          options={cities}
          error={errors.city?.message}
          disabled={true}
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
        <CustomButton text={"Next"} type="submit" disabled={!!stateError || !legalStates.includes(selectedState)}
/>
      </div>
    </form>
  );
};

export default UserInformation;
