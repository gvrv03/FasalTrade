"use client";
import BrokerSign from "@/components/Athentication/BrokerSign";
import FarmerSign from "@/components/Athentication/FarmerSign";
import React, { useState } from "react";

const Authentication = () => {
  const [isFarmer, setIsFarmer] = useState(true);

  return (
    <>
      <div className="flex gap-20">
        <div className="w-full">
          <img
            className="w-full"
            src="https://agronicfood.com/wp-content/uploads/2020/02/0-4.png.webp"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-5">
            <button
              onClick={() => {
                setIsFarmer(true);
              }}
              className={`text-black p-2 ${
                isFarmer && "border-b-2"
              } border-blue-500 font-semibold rounded-md`}
            >
              Farmer login
            </button>
            <button
              onClick={() => {
                setIsFarmer(false);
              }}
              className={`text-black p-2 ${
                !isFarmer && "border-b-2"
              } border-blue-500  font-semibold rounded-md`}
            >
              Broker login
            </button>
          </div>
          <div className="mt-5">
            {isFarmer ? <FarmerSign /> : <BrokerSign />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
