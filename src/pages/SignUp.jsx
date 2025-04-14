import React, { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import CustomButton from "../components/CustomButton";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../components/Toaster";
import { useForm } from "react-hook-form";
import { FiMail } from "react-icons/fi";
import { CiLock } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { PiEnvelopeLight } from "react-icons/pi";
import { CiPhone } from "react-icons/ci";

import axios from "../axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);

  const [newUser, setNewUser] = useState("");

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const createAccount = async (formData) => {
    setLoading(true);

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        formData?.email,
        "Test@123"
      );
      const user = newUser.user;
      setNewUser(newUser);
      // Get the ID token
      const token = await getIdToken(user);
      if (token) {
        setIdToken(token);
      } else {
        ErrorToast("Token not found");
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ firebase ONE is ~ error:", error?.message);
      if (error?.message?.includes("auth/email-already-in-use")) {
        // Try to sign in the
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            formData?.email,
            "Test@123"
          );
          const user = userCredential?.user;
          //   // Get the ID token
          const token = await getIdToken(user);
          if (token) {
            setIdToken(token);
          } else {
            ErrorToast("Token Not Found");
            setLoading(false);
          }
        } catch (err) {
          console.log("🚀 ~ ~ firebase Two is ~ err:", err);
          ErrorToast("Email is already in use");
          setLoading(false);
        }
      } else {
        ErrorToast("Login error || Firebase authentication failed");
        setLoading(false);
      }
    }
  };

  const sendDataToBackend = async (formData) => {
    if (idToken) {
      setLoading(true);
      try {
        let obj = {
          dispensaryName: formData.dispensaryName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phoneNumber: formData.phoneNumber,
          idToken: idToken,
        };
        const response = await axios.post("/auth/dispansory-signup", obj);

        if (response.status === 201 || response.status === 200) {
          sessionStorage.setItem("email", formData?.email);
          sessionStorage.setItem("phoneNumber", formData?.phoneNumber);
          setLoading(false);
          SuccessToast("SignUp Successfully");
          // navigate("/verify-otp");
          navigate("/verification");
        } else {
          ErrorToast(response?.message);
        }
      } catch (err) {
        console.log("🚀 ~ sendDataToBackend ~ err:", err);
        ErrorToast(err?.response?.data?.message);
        if (newUser && newUser.user) {
          // If an account was created but an error occurred after, delete the account
          try {
            await newUser.user.delete();
            console.log("Account successfully deleted.");
          } catch (deleteError) {
            console.log("Failed to delete the account:", deleteError);
            ErrorToast(deleteError);
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (idToken) {
      let obj = {
        dispensaryName: getValues("fullName"),
        email: getValues("email"),
        password: getValues("password"),
        confirmPassword: getValues("confPassword"),
        phoneNumber: getValues("phoneNumber"),
        idToken: idToken,
      };
      sendDataToBackend(obj);
    }
  }, [idToken]);

  return (
    <div className="flex justify-center items-center h-full w-full pt-6">
      <div className="flex justify-center items-center w-full py-2">
        <div className=" h-full lg:w-[30%] md:w-[50%] w-[90%] p-6 rounded-xl">
          <form className="h-auto" onSubmit={handleSubmit(createAccount)}>
            <div className="mb-6">
              <p className="bg-red text-[22px] font-bold text-primary">
                Sign Up
              </p>
              <p className="bg-red text-[13px] text-secondary">
                Enter the details below to Sign up
              </p>
            </div>
            <div className="relative w-full">
              <InputField
                text={"Full Name"}
                placeholder={"Full Name"}
                register={register("fullName", {
                  required: "Please enter your name.",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter a valid name.",
                  },
                })}
                type={"text"}
                error={errors.fullName}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }}
                icon={true}
              />
              <CiUser
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.fullName ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>
            <div className="relative w-full h-auto flex flex-col justify-start items-start my-4">
              <InputField
                text={"Email"}
                placeholder={"Email Address"}
                type={"email"}
                register={register("email", {
                  required: "Please enter your email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
                error={errors.email}
                icon={true}
              />
              <PiEnvelopeLight
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.email ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div
              className={`relative w-full h-auto flex flex-col justify-start items-start my-4`}
            >
              <InputField
                type={"text"}
                text={"Phone"}
                placeholder={"Phone Number"}
                register={register("phoneNumber", {
                  required: "Please enter your phone number.",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
                maxLength="10"
                error={errors.phoneNumber}
                isPhone={true}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                icon={true}
              />
              <CiPhone
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.phoneNumber ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="relative w-full h-auto flex flex-col justify-start items-start my-4">
              <InputField
                register={register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
                })}
                maxLength={12}
                text={"Password"}
                placeholder={"Enter your password here"}
                type={"password"}
                error={errors.password}
                icon={true}
              />
              <CiLock
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.password ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="relative w-full h-auto flex flex-col justify-start items-start my-4">
              <InputField
                register={register("confPassword", {
                  required: "Please enter confirm password.",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
                  },
                  validate: (value) =>
                    value === password.current ||
                    "Confirm Password does not match",
                })}
                maxLength={12}
                text={"Confirm Password"}
                placeholder={"Enter confirm password here"}
                type={"password"}
                error={errors.confPassword}
                icon={true}
              />
              <CiLock
                size={20}
                className={`text-gray-600 absolute left-2 ml-2 ${
                  errors.confPassword ? "top-[25%]" : "top-[35%]"
                }`}
              />
            </div>

            <div className="pt-1">
              <CustomButton
                text={"Sign Up"}
                type="submit"
                loading={loading}
                // handleClick={handleNavigate}
              />
            </div>
          </form>
          <div className="flex items-center mt-2">
            <hr className="w-full border-t border-[#959393]" />
            <p className="px-2 text-[#959393]">OR</p>
            <hr className="w-full border-t border-[#959393]" />
          </div>
          <SocialLogin />
          <div className="flex items-center mt-2">
            <p className="text-secondary sm:ml-6 text-[13px] text-center">
              By registering, you accept our{" "}
              <span className="text-primary mr-1">
                <a
                  href="https://buzzhub-landing.vercel.app/termsandconditions2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Services
                </a>
              </span>
              &{" "}
              <span className="ml-1 text-primary">
                <a
                  href="https://buzzhub-landing.vercel.app/privacypolicy2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
