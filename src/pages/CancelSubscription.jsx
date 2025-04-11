import axios from "axios";
import React from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md"; // icons for status
import { useNavigate, useSearchParams } from "react-router-dom";
import { SuccessToast } from "../components/Toaster";

const CancelSubscription = () => {
  const navigate = useNavigate();

  const [searchParams] = new useSearchParams();

  let queryParams = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  console.log("queryParams -- ", queryParams);
  let subscription = null;
  const cancelSubscription = async () => {
    try {
      const { subscriptionPlan, token } = queryParams;
      subscription = JSON.parse(subscriptionPlan);
      console.log(subscription);
      sessionStorage.setItem("token", token);
      const response = await axios.post(
        "https://api.buzzhubapp.com/dispensary/cancel-subscription",
        {
          subscriptionId: subscription.subscriptionId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set token in the header
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
            {/* <img
              src={Logo}
              alt="pill"
              className="w-[60px] h-[60px] bg-green-600 rounded-full"
            /> */}
            <div className="flex flex-col">
              {/* <h1 className="text-2xl font-bold text-gray-800">Subscription</h1> */}
              <p className="text-sm text-gray-600">Subscription Status</p>
            </div>
          </div>

          {/* Right Side: Status */}
          <div className="flex items-center gap-2">
            {subscription?.subscriptionPlan?.status === "active" ? (
              <MdCheckCircle size={20} color="green" />
            ) : (
              <MdCancel size={20} color="red" />
            )}
            <span className="text-md font-semibold text-gray-800">
              {subscription?.subscriptionPlan?.status === "active"
                ? "Active"
                : "Inactive"}
            </span>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="space-y-4">
          <div className="space-y-2 border-b pb-4">
            <p className="text-md text-gray-600">
              <strong>Plan:</strong>{" "}
              {subscription?.SubscriptionPlan.SubscriptionPlan} Plan
            </p>
            <div className="flex items-center gap-2">
              <p className="text-gray-600">Amount</p>
              <span className="text-xl font-bold text-green-600">
                ${subscription?.subscriptionPlan.totalAmount}
              </span>
            </div>
          </div>

          <div className="flex items-center text-black gap-2">
            <p className="text-gray-600">Status :</p>
            {subscription?.subscriptionPlan.status}
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>Period:</strong>{" "}
              {new Date(
                subscription?.subscriptionPlan.currentPeriodStart
              ).toLocaleDateString()}{" "}
              -{" "}
              {new Date(
                subscription?.subscriptionPlan.currentPeriodEnd
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Cancel Subscription Button (Now Static) */}
        <div className="flex justify-left mt-6">
          <button
            onClick={cancelSubscription}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed"
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
