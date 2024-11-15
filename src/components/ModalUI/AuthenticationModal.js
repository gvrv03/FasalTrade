"use client";
import React, { useState } from "react";
import Registration from "../Athentication/Registration";
import { Slide } from "@mui/material";
import SignIn from "../Athentication/SignIn";
import Image from "next/image";

const AuthenticationModal = ({ state, setstate }) => {
  const [isLoginState, setisLoginState] = useState(true);

  return (
    <>
      <div
        className={`${
          state ? "fixed" : "hidden"
        } w-full h-screen grid place-items-center top-0 bottom-0 left-0 z-[9999]`}
      >
        {/* Background overlay */}
        <div className="bg-black absolute w-full h-full text-black opacity-[80%]" />

        {/* Modal content with Slide animation */}
        <Slide
          direction={state ? "up" : "down"}
          in={state}
          mountOnEnter
          unmountOnExit
        >
          <div className="bg-white border p-5 pb-20 md:pb-5 md:relative absolute transition-all duration-500 ease-in-out w-full md:w-[800px] md:rounded-lg rounded-t-lg shadow bottom-0">
            <div className="w-full grid place-items-center py-10">
              <Image
                loading="lazy"
                className=""
                src="/auth.png"
                width={300}
                height={300}
              />
            </div>
            <button
              type="button"
              onClick={() => setstate(false)} // Close modal on click
              className="text-gray-400 bg-transparent  absolute top-5 right-5  hover:bg-gray-100 hover:rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="defaultModal"
            >
              <i className="uil uil-times text-xl" />
            </button>

            {isLoginState ? (
              <SignIn setisLoginState={setisLoginState} />
            ) : (
              <Registration setisLoginState={setisLoginState} />
            )}
          </div>
        </Slide>
      </div>
    </>
  );
};

export default AuthenticationModal;
