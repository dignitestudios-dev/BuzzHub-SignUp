import React, { useRef, useState } from "react";
import CountDown from "../components/CountDown";
import CustomButton from "../components/CustomButton";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import axios from "../axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp, setOtp] = useState(Array(4).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const inputs = useRef([]);
  //   const {login} = useContext(AuthContext)
  const otpEmail = sessionStorage.getItem("email");

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if it's not the last
      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to the previous input if it's not the first
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const getOtpValue = () => {
    return otp.join("");
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      let obj = { email: otpEmail, code: getOtpValue() };

      const response = await axios.post("/auth/validate-otp", obj);
      console.log("🚀 ~ handleVerifyOtp ~ response:", response);
      if (response?.status === 200) {
        sessionStorage.setItem("token", response?.data?.token);
        setLoading(false);
        navigate("/success");
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: otpEmail };
      const response = await axios.post("auth/send-otp", obj);

      if (response.status === 200) {
        // navigate("/select-package");
        SuccessToast("Otp has been send to your email");
        setResendLoading(false);
        setOtp(Array(4).fill(""));
        handleRestart();
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRestart = () => {
    setSeconds(30);
    setIsActive(true);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className="flex justify-center items-center w-full">
        <div className="bg-[#f9FAFA] h-full lg:w-[30%] md:w-[50%] w-[90%] p-6 shadow-sm rounded-xl">
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className="text-[32px] md:text-[48px] font-bold ">
              Verification
            </h1>
            <p className="text-[#8A8A8A] font-normal md:text-[17px] text-[14px]">
              Enter the OTP code sent to your email
            </p>
          </div>
          <div className="w-full h-auto grid grid-cols-4 justify-center items-center gap-4 mb-6 mt-12 ">
            {otp.map((digit, index) => (
              <input
                inputmode="numeric"
                key={index}
                type="password"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputs.current[index] = el)}
                className=" h-[58px] md:h-[54px] rounded-xl outline-none text-center bg-light
                 md:text-2xl text-xl focus-within:border-[#8A8A8A] flex items-center justify-center"
              />
            ))}
          </div>
          <div className="w-full h-auto flex justify-center lg:flex lg:flex-col mb-10 md:justify-start md:mb-20 gap-1">
            <div className="w-full lg:w-[434px] flex justify-center items-center lg:justify-center lg:items-center gap-1">
              <span className="text-[13px] font-medium text-[#8a8a8a]">
                Didn't recieve OTP code? Resend in
              </span>
              {isActive ? (
                <CountDown
                  isActive={isActive}
                  setIsActive={setIsActive}
                  seconds={seconds}
                  setSeconds={setSeconds}
                />
              ) : (
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={handleResendOtp}
                  className="outline-none text-[13px] border-none text-primary font-bold"
                >
                  {resendLoading ? "Resending..." : "Resend now"}
                </button>
              )}
            </div>
          </div>
          <div>
            <CustomButton
              text={"Verify"}
              type="button"
              handleClick={handleVerifyOtp}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
