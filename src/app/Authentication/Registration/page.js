"use client";
import BrokerRegistration from "@/components/Athentication/BrokerRegistration";
import FarmerRegistration from "@/components/Athentication/FarmerRegistration";
import React, { useState } from "react";

const Authentication = () => {
  const [IsBroker, setIsBroker] = useState(true);

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
                setIsBroker(true);
              }}
              className={`text-black p-2 ${
                IsBroker && "border-b-2"
              } border-blue-500 font-semibold rounded-md`}
            >
              Farmer Registration
            </button>
            <button
              onClick={() => {
                setIsBroker(false);
              }}
              className={`text-black p-2 ${
                !IsBroker && "border-b-2"
              } border-blue-500  font-semibold rounded-md`}
            >
              Broker Registration
            </button>
          </div>
          <div className="mt-5">
            {IsBroker ? <FarmerRegistration /> : <BrokerRegistration />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
