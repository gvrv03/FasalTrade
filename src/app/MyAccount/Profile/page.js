"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";

const Profile = () => {
  const { userDetails } = useAppStore();
  return (
    <div className="flex flex-col border rounded-md p-5 gap-5  justify-center ">
      <p className=" font-semibold text-2xl md:text-3xl">
        Name : <span className="font-light" >{userDetails.User}</span>
      </p>
      <p className=" font-semibold text-xl  md:text-xl">
        Phone No: <span className="font-light" >{userDetails.UserPhone}</span>
      </p>
      <p className=" font-semibold text-xl  md:text-xl">
        Email : <span className="font-light" >{userDetails.UserEmail}</span>
      </p>
      <p className=" font-semibold text-xl  md:text-xl">
        Gender : <span className="font-light" >{userDetails.UserGender}</span>
      </p>
      <p className=" font-semibold text-xl  md:text-xl">
        Role : <span className="font-light" >{userDetails.UserRole == "FARMERUSER" ? "Farmer" : "Broker"}</span>
      </p>
    </div>
  );
};

export default Profile;
