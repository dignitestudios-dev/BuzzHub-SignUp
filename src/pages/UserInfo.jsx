import React, { useEffect, useState } from "react";
import { FiMail, FiPhone, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "../axios";
import { ErrorToast, SuccessToast } from "../components/Toaster";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [startingTime, setStartingTime] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [closingTimeValue, setClosingTimeValue] = useState("");
  const [pickupType, setPickupType] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const [fileNames, setFileNames] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const [fileUpload, setFileUpload] = useState({
    front: "",
    back: "",
    left: "",
    right: "",
  });

  const [profileImg, setProfileImg] = useState("");
  const [profileFile, setProfileFile] = useState("");

  const [formData, setFormData] = useState({});
  console.log("fileNames 00--", fileNames);

  useEffect(() => {
    // Retrieve userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Check if userData exists before setting the state
    if (userData) {
      const openingTime = moment(userData.openingHourTime).format("HH:mm");
      const closingTime = moment(userData.closingHourTime).format("HH:mm");
      setTimeValue(openingTime);
      setClosingTimeValue(closingTime);

      const formattedOpeningTimeWithDate = moment()
        .set({
          hour: moment(openingTime, "HH:mm").hour(),
          minute: moment(openingTime, "HH:mm").minute(),
          second: 0,
        })
        .toISOString();
      setStartingTime(formattedOpeningTimeWithDate);

      const formattedClosingTimeWithDate = moment()
        .set({
          hour: moment(closingTime, "HH:mm").hour(),
          minute: moment(closingTime, "HH:mm").minute(),
          second: 0,
        })
        .toISOString();
      setClosingTime(formattedClosingTimeWithDate);

      setFormData({
        dispensaryName: userData.dispensaryName || "Dispensary Name", // Fallback to default if undefined
        phoneNumber: `+1 ${userData.phoneNumber || "8340570746"}`, // Fallback phone format
        streetAddress: `${userData.streetAddress || "Toronto"}`,
        bio:
          userData.bio ||
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

        // openingHour: new Date(userData.openingHourTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Format time
        // closingHour: new Date(userData.closingHourTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),  // Format time
        city: userData.city || "City Name", // Fallback to default if undefined
        state: userData.state || "state", // Fallback to default if undefined
        deliveryRadius: userData.deliveryRadius || "deliveryRadius", // Fallback to default if undefined
        zipCode: userData.zipCode || "zipCode", // Fallback to default if undefined
        disType: userData.disType?.toUpperCase() || "", // Normalize to 'MED' or 'REC'
      });

      setPickupType(userData?.fulfillmentMethod);
      setProfileImg(userData?.profilePicture);
      setFileNames({
        back: userData.licenseBack,
        front: userData.licenseFront,
        left: userData.registrationLicenseFront,
        right: userData.registrationLicenseBack,
      });
    }
  }, []);

  const handleOpeningTimeChange = (e) => {
    const formattedTimeWithDate = moment()
      .set({
        hour: moment(e.target.value, "HH:mm").hour(),
        minute: moment(e.target.value, "HH:mm").minute(),
        second: 0,
      })
      .toISOString();
    setStartingTime(formattedTimeWithDate);
    setTimeValue(e.target.value);
  };

  const handleClosingTimeChange = (e) => {
    const formattedTimeWithDate = moment()
      .set({
        hour: moment(e.target.value, "HH:mm").hour(),
        minute: moment(e.target.value, "HH:mm").minute(),
        second: 0,
      })
      .toISOString();
    setClosingTime(formattedTimeWithDate);
    setClosingTimeValue(e.target.value);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "streetAddress" && value.trim() !== "") {
      setFormData((prev) => ({ ...prev, streetAddress: value }));

      try {
        const apiKey = import.meta.env.VITE_APP_GOOGLE_MAP_API_KEY;
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            value
          )}&components=country:us&key=${apiKey}`
        );
        const data = await res.json();

        if (data.status === "OK") {
          setAddressSuggestions(data.predictions);
        } else {
          setAddressSuggestions([]);
        }
      } catch (err) {
        console.error("Autocomplete error:", err);
        setAddressSuggestions([]);
      }
    }
  };

  const handleCheckboxChange = (type) => {
    if (pickupType === type) {
      setPickupType("");
    } else {
      setPickupType(type);
    }
  };

  const handleDispensaryTypeChange = (e) => {
    setFormData({ ...formData, disType: e.target.value });
  };

  const handleApiCall = async () => {
    setLoading(true);
    try {
      // data
      const data = new FormData();
      data.append("dispensaryName", formData.dispensaryName);
      data.append("bio", formData.bio);
      data.append("city", formData?.city);
      data.append("country", "USA");
      data.append("deliveryRadius", formData.deliveryRadius);
      data.append("closingHourTime", closingTime);
      data.append("openingHourTime", startingTime);
      data.append("fulfillmentMethod", pickupType);
      // data.append("pickupType", JSON.stringify(formData.pickupType)); // assuming it's an array
      data.append("state", formData.state);
      data.append("streetAddress", formData.streetAddress);
      data.append("zipCode", formData.zipCode);
      data.append("disType", formData.disType);

      data.append(
        "location[coordinates]",
        JSON.stringify([
          formData.longitude || -74.0059413,
          formData.latitude || 40.7127837,
        ])
      );
      // data.append("location[type]", "Point");

      // Append file data (if exists)
      if (profileFile) {
        data.append("profilePicture", profileFile);
      }
      if (fileUpload.front) {
        data.append("licenseFront", fileUpload.front);
      }
      if (fileUpload.back) {
        data.append("licenseBack", fileUpload.back);
      }
      if (fileUpload.left) {
        data.append("registrationLicenseFront", fileUpload.left);
      }
      if (fileUpload.right) {
        data.append("registrationLicenseBack", fileUpload.right);
      }

      const response = await axios.post(
        "dispensary/dispensary-complete-profile",
        data
      );
      if (response.status === 200) {
        setLoading(false);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        SuccessToast("Information Submitted");
        navigate("/profile");
      }
    } catch (err) {
      console.log("🚀 ~ handleApiCall ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, position) => {
    const file = e.target.files[0];
    setFileUpload((prevFileNames) => ({
      ...prevFileNames,
      [position]: file,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
    }
  };

  return (
    <div className="w-full text-black mx-auto p-6 bg-white shadow-lg overflow-auto">
      <h1 className="text-black text-3xl font-bold mb-8 border-b pb-2">
        Edit Profile
      </h1>

      {/* Profile Section (Image and Name) */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{formData.dispensaryName}</h2>
          <p className="text-gray-500 text-sm mt-1">Dispensary</p>
        </div>
        <div
          className="relative flex items-center justify-center w-[88px] h-[88px] mb-4  mt-4 border-2
         border-primary border-dashed bg-[#F6F6F6] rounded-full"
        >
          <img
            src={profileFile ? URL.createObjectURL(profileFile) : profileImg}
            alt="Uploaded Preview"
            className="w-full h-full object-cover rounded-full"
          />
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer my-1"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMail className="text-gray-500" />
          <input
            type="text"
            name="dispensaryName"
            value={formData.dispensaryName}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Dispensary Name"
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FiMapPin className="text-gray-500" />
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Address"
          />
          {/* Display Address Suggestions */}
          <div className="mt-2">
            {addressSuggestions.length > 0 &&
              addressSuggestions.map((suggestion) => (
                <div
                  key={suggestion.place_id}
                  className="p-2 bg-gray-100 cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      streetAddress: suggestion.description,
                    }))
                  }
                >
                  {suggestion.description}
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="ml-2 w-full p-2 outline-none"
            placeholder="Bio"
            rows={4}
          />
        </div>

        {/* Opening and Closing Hours */}
        <div className="flex space-x-4 mt-4">
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={timeValue}
              onChange={handleOpeningTimeChange}
              className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 w-1/2">
            <input
              type="time"
              value={closingTimeValue}
              onChange={handleClosingTimeChange}
              className="w-[98%] text-sm text-[#1D7C42] placeholder:font-normal h-[56px] font-medium 
                px-4 lg:py-3 md:py-2 py-3 my-1 rounded-xl outline-none bg-light shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          className="w-full py-2 bg-primary text-white rounded-lg shadow-md"
          onClick={handleApiCall}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
