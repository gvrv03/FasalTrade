"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import GlobalLayout from "@/Layout/GlobalLayout";
import { useRouter } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }) => {
  const Router = useRouter()
  const { userDetails } = useAppStore();
  if (!userDetails.isLogin) {
    return <GlobalLayout>{children}</GlobalLayout>;
  } else {
    return <GlobalLayout>Already Login

      <button className="p-2 bg-blue-600  text-white ml-5 " onClick={()=>{
        Router.push("/MyAccount/Profile")
      }}  >Go to Hom</button>
    </GlobalLayout>;
  }
};

export default AuthLayout;
