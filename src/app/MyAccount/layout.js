"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import MyAccountLayout from "@/Layout/MyAccountLayout";
import { useRouter } from "next/navigation";
import React from "react";

const AccountLayouut = ({ children }) => {
  const { userDetails } = useAppStore();
  const router = useRouter() 

  if (userDetails?.isLogin) {
    return <MyAccountLayout>{children}</MyAccountLayout>;
  } else {
    return (
      <div className="container h-[90vh] flex flex-col items-center  justify-center  gap-5 m-auto">
        <p className="text-center font-semibold ">You Need to login</p>
        <button 
        onClick={()=>{
          router.push("/Authentication/SignIn")
        }}
        className="bg-blue-500 font-semibold p-2 w-full md:w-fit md:px-20 text-white rounded-md">
          Log In{" "}
        </button>
      </div>
    );
  }
};

export default AccountLayouut;
