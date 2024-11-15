import React, { useState } from "react";
import { PrimaryButton } from "../Utility/ButtonsAll";
import { useUserAuth } from "@/Context/UserAuthContext";

const Registration = ({ setisLoginState }) => {
  const [userOTP, setuserOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [phoneNo, setphoneNo] = useState("");

  const {
    otpSend,
    isUserExist,
    createNewUser,
    timer,
    isTimerRunning,
    resendOTP,
  } = useUserAuth();
  const [userData, setuserData] = useState({
    gender: "male",
    name: "",
    email: "",
    dob: "",
  });

  const [password, setpassword] = useState("");

  function onChange(e) {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const sendOTPtoUser = async (e) => {
    e.preventDefault();
    setloading(true);
    if (phoneNo.length < 9) {
      toast.error("Enter the number");
      return setloading(false);
    }
    await isUserExist(phoneNo, userData.email);
    return setloading(false);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!userOTP) {
      toast.error("Enter the OTP");
      return setloading(false);
    }
    await createNewUser(parseInt(userOTP), phoneNo, userData, password);
    return setloading(false);
  };

  return (
    <form
      onSubmit={!otpSend ? sendOTPtoUser : verifyOTP}
      method="POST"
      className="flex flex-col gap-5 w-full   "
    >
      <div className="border flex gap-5 items-center  rounded-md  w-full border-gray-200 ">
        <i className="uil uil-user bg-gray-100 px-4 py-3" />
        <div className="flex w-full gap-2 items-center">
          <select
            required={true}
            onChange={onChange}
            value={userData.gender}
            name="gender"
            className="bg-transparent "
          >
            <option value="male">Mr.</option>
            <option value="female">Miss.</option>
          </select>
          <input
            type="text"
            onChange={onChange}
            value={userData.name}
            name="name"
            placeholder="Full Name"
            className=" w-[100%] outline-none "
          />
        </div>
      </div>

      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <i className=" bg-gray-100 px-4 py-3">@</i>
        <input
          type="email"
          onChange={onChange}
          value={userData.email}
          name="email"
          placeholder="email"
          className=" w-[100%] outline-none "
        />
      </div>
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <i className=" bg-gray-100 px-4 py-3 uil uil-calender " />
        <input
          type="date"
          onChange={onChange}
          value={userData.dob}
          name="dob"
          placeholder="dob"
          className=" w-[100%] outline-none "
        />
      </div>

      <div className=" flex gap-5 items-center  ">
        <div className="rounded-md flex border gap-5 border-gray-200  w-full">
          <i className="    bg-gray-100 px-4 py-3 uil uil-phone "></i>
          <input
            type="number"
            onChange={(e) => {
              setphoneNo(e.target.value);
            }}
            name="phoneNo"
            value={userData.phoneNo}
            placeholder="Phone No."
            className=" w-[100%] outline-none "
          />
        </div>
      </div>
      <div className="flex gap-5 md:flex-row flex-col w-full">
        <div className="border flex gap-5 w-full items-center  rounded-md  border-gray-200 ">
          <i className=" bg-gray-100 uil uil-lock px-4 py-3" />
          <input
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            required={true}
            placeholder="Password"
            className=" w-[100%] outline-none "
          />
        </div>{" "}
      </div>

      {otpSend && (
        <>
          <div className="border flex gap-5 w-full items-center  rounded-md  border-gray-200 ">
            <i className=" bg-gray-100 uil uil-lock px-4 py-3" />
            <input
              type="number"
              onChange={(e) => {
                setuserOTP(e.target.value);
              }}
              className="p-2 w-full   bg-transparent text-sm outline-none py-3 "
              required={true}
              placeholder="Enter OTP"
            />
          </div>
          <div className="w-full">
            <button
              onClick={async () => {
                await resendOTP(phoneNo);
              }}
              disabled={isTimerRunning ? true : false}
              className="pColor font-semibold float-right"
            >
              Reset OTP in : {timer}s
            </button>
          </div>
          <PrimaryButton
            style=" px-5 py-3  w-full rounded-md pBtn"
            name="Continue"
            loading={loading}
          />
        </>
      )}
      <div className="flex  justify-center gap-3 text-gray-500  items-center">
        <p>
          By clicking on Login, I accept the <b>Terms & Conditions</b> &{" "}
          <b>Privacy Policy</b>{" "}
        </p>
      </div>

      {!otpSend && (
        <PrimaryButton style="px-5 py-3" loading={loading} name="Send OTP" />
      )}

      <div className="text-center text-gray-500">
        If you have an account ?{" "}
        <button
          className="text-blue-800 font-semibold"
          onClick={() => {
            setisLoginState(true);
          }}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Registration;
