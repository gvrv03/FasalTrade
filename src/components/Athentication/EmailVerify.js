import React from "react";

const EmailVerify = () => {
  return (
    <div className="flex flex-col w-full  ">
      <h2 className="font-bold text-gray-700 text-2xl ">
        Welcome to GDGC, GCOEN
      </h2>
      <h5 className="text-gray-400 font-semibold">
        Log in or sign up with your college email (ends with @gcoen.ac.in){" "}
      </h5>
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 mt-5">
        <i className="uil uil-user-plus bg-gray-100 px-4 py-3" />
        <input
          type="email"
          placeholder="Username / Email"
          className=" w-[100%] outline-none "
        />
      </div>
      <button className="bg-blue-800  mt-5 px-5 py-2 text-white font-semibold rounded-full">
        Continue
      </button>
    </div>
  );
};

export default EmailVerify;
