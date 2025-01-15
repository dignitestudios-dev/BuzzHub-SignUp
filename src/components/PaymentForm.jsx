import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { ErrorToast, SuccessToast } from "./Toaster";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#000000",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "13px",
      fontWeight: "500",
      "::placeholder": {
        color: "#000000",
      },
      backgroundColor: "#F3F3F3",
      border: "none",
      padding: "0 12px",
      borderRadius: "12px",
      height: "100px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = ({ state }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method using stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("dispensary/create-subscription", {
          planType: state,
          paymentMethodId: paymentMethod.id,
        });
        console.log("🚀 ~ handleSubmit ~ response:", response);

        if (response.status === 200) {
          navigate("/req-success");
          SuccessToast("Subscribed");
          setLoading(false);
        }
      } catch (err) {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        ErrorToast(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
        <label className="ml-1 text-sm font-medium capitalize">
          Payment method
        </label>
        <div
          className={`w-full pt-4 h-[52px] lg:w-[434px] rounded-[12px] bg-light flex items-center shadow-sm justify-start ${
            error && "error"
          }`}
        >
          <div className="w-full h-full flex items-center justify-center rounded-[12px] relative">
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="w-full h-full px-3 text-sm font-medium"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      {/* Buttons */}
      <div className="w-full grid grid-cols-6 md:grid-cols-2 md:justify-start gap-2 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full px-8 md:px-0  col-span-2 h-[48px] md:h-[52px] bg-secondary
           rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold border border-gray-300"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          // onClick={() => navigate("/summary")}
          className="w-full  px-14 col-span-2  md:px-0 h-[48px] md:h-[52px] bg-primary text-white rounded-[12px] 
          flex items-center justify-center text-[14px] md:text-[16px] font-bold"
        >
          {loading ? "Loading..." : "Proceed"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
