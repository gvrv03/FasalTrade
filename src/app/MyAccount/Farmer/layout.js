"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";

const BrokerLayot = ({ children }) => {
  const { userDetails } = useAppStore();

  if (userDetails.UserRole == "FARMERUSER") {
    return <div>{children}</div>;
  } else {
    return <div>Access Denied</div>;
  }
};

export default BrokerLayot;
