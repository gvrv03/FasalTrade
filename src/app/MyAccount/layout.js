"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import MyAccountLayout from "@/Layout/MyAccountLayout";
import React from "react";

const AccountLayouut = ({ children }) => {
  const { userDetails } = useAppStore();

  if (userDetails?.isLogin) {
    return <MyAccountLayout>{children}</MyAccountLayout>;
  } else {
    return (
      <div className="container h-[90vh] grid place-items-center m-auto">
        <p className="text-center font-semibold " >You Need to login</p>
      </div>
    );
  }
};

export default AccountLayouut;
