"use client"
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { userDetails } = useAppStore();
  if (userDetails?.isAdmin || userDetails?.isRoot) {
    return <div>{children}</div>;
  } else {
    return <div>You Need an Access</div>;
  }
};

export default DashboardLayout;
