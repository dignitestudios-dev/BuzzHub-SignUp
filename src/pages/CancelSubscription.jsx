import axios from "axios";
import React from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md"; // icons for status
import { useNavigate, useSearchParams } from "react-router-dom";
import { SuccessToast } from "../components/Toaster";

// Define plan descriptions for mapping
const planDescriptions = {
  basic: "3-Month Plan – Mobile App Only",
  standard: "3-Month Plan – Mobile App + Web Platform",
  bronze: "6-Month Plan – Mobile App Only",
  bronzePlus: "6-Month Plan – Mobile App + Web Platform",
  premium: "12-Month Plan – Mobile App Only",
  premiumPlus: "12-Month Plan – Mobile App + Web Platform",
};

const CancelSubscription = () => {
  const navigate = useNavigate();

  const [searchParams] = new useSearchParams();
  let queryParams = {};

  // Retrieve query parameters
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  // Parse subscription data from query params
  let subscriptionData = JSON.parse(queryParams?.subscriptionPlan);
  console.log("subscriptionData -- ", subscriptionData);

  // Get description for the subscription plan
  const planDescription =
    planDescriptions[subscriptionData?.SubscriptionPlan] ||
    "No description available";

  const cancelSubscription = async () => {
    try {
      const { subscriptionPlan, token } = queryParams;
      const subscription = JSON.parse(subscriptionPlan);

      sessionStorage.setItem("token", token);
      const response = await axios.post(
        "https://api.buzzhubapp.com/dispensary/cancel-subscription",
        {
          subscriptionId: subscription.subscriptionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        SuccessToast("Your subscription has been cancelled.");
        navigate("/cancelled-screen");
      }
    } catch (err) {
      console.error("Error canceling subscription:", err);
    }
  };

  const isButtonDisabled =
    subscriptionData?.status === "cancelled" ||
    subscriptionData?.status === "inactive";

  return (
    <div className="flex flex-col w-full justify-center min-h-screen h-full bg-gray-100 px-4 py-4">
      {/* Subscription Plan Card */}
      <div className="flex flex-col">
        <h1 className="text-2xl text-center font-bold text-gray-800">
          Subscription
        </h1>
        <p className="text-sm text-center text-gray-600 mb-2">
          Manage Your Subscription Plan
        </p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Subscription Status</p>
            </div>
          </div>

          {/* Right Side: Status */}
          <div className="flex items-center gap-2">
            {subscriptionData?.status === "active" ? (
              <MdCheckCircle size={20} color="green" />
            ) : (
              <MdCancel size={20} color="red" />
            )}
            <span className="text-md font-semibold text-gray-800">
              {subscriptionData?.status === "active" ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="space-y-4">
          <div className="space-y-2 border-b pb-4">
            <p className="text-md text-gray-600">
              <strong>Plan:</strong>{" "}
              {subscriptionData?.SubscriptionPlan.toLowerCase()} Plan{" "}
              {/* Displaying plan name in lowercase */}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Description:</strong> {planDescription}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Amount</p>
              <span className="text-xl font-bold text-green-600">
                ${subscriptionData?.totalAmount}
              </span>
            </div>
          </div>

          <div className="flex items-center text-black gap-2">
            <p className="text-gray-600">Status :</p>
            {subscriptionData?.status}
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>Period:</strong>{" "}
              {new Date(
                subscriptionData?.currentPeriodStart
              ).toLocaleDateString()}{" "}
              -{" "}
              {new Date(
                subscriptionData?.currentPeriodEnd
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Cancel Subscription Button (Now Static) */}
        <div className="flex justify-left mt-6">
          <button
            disabled={isButtonDisabled}
            onClick={cancelSubscription}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold cursor-not-allowed"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
