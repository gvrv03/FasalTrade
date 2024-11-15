"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import { useAppStore } from "@/Context/UseStoreContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PrimaryButton } from "../Utility/ButtonsAll";

const UserProfile = () => {
  const [disablePersonal, setdisablePersonal] = useState(true);
  const [loading, setloading] = useState(false);
  const [disable, setdisable] = useState(true);
  const router = useRouter();
  const { updateUserDetail } = useUserAuth();
  const [userData, setuserData] = useState({});
  const { userDetails } = useAppStore();

  function onChange(e) {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setloading(true);
    await updateUserDetail(userData);
    setloading(false);
  };

  return (
    <div className="flex flex-col bg-white text-black">
      <div className=" bg-white">
        <div className="mt-2 flex flex-col md:flex-row w-full items-center gap-5">
          <div className="md:mr-5 h-full grid place-items-center">
            <div className="relative  ">
              <img
                src={userDetails?.User?.image}
                alt={userDetails?.User?.name}
                className="w-20"
              />
            </div>
            <button
              onClick={() => {
                if (disablePersonal) {
                  setdisablePersonal(false);
                } else {
                  setdisablePersonal(true);
                }
              }}
              className="mt-2 bg-blue-500 px-3 py-1 text-white font-semibold rounded-full  text-xs"
            >
              Edit
            </button>
          </div>
          <div className="flex-col flex md:w-auto w-full gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
              <div className="gap-2 flex bg-gray-50 text-black items-center rounded p-2">
                <i className="uil uil-user text-black text-lg" />
                <input
                  disabled={disablePersonal}
                  type="text"
                  value={
                    userData.name ? userData?.name : userDetails?.User?.name
                  }
                  onChange={onChange}
                  name="name"
                  className="px-2 disabled: bg-transparent disabled:text-gray-500 outline-none w-full"
                />
              </div>
              <div className="gap-2 flex items-center rounded bg-gray-50 text-black p-2">
                <i className="uil uil-calender text-black text-lg" />
                <input
                  type="date"
                  disabled={disablePersonal}
                  value={userData.dob ? userData?.dob : userDetails?.User?.dob}
                  onChange={onChange}
                  name="dob"
                  className="px-2 disabled: bg-transparent disabled:text-gray-500 outline-none w-full"
                />
              </div>
              <div className="gap-2 flex items-center rounded bg-gray-50 p-2">
                <i className="uil uil-venus text-black text-lg" />
                <select
                  disabled={disablePersonal}
                  value={
                    userData.gender
                      ? userData?.gender
                      : userDetails?.User?.gender
                  }
                  onChange={onChange}
                  name="gender"
                  className="px-2 disabled: bg-transparent text-black disabled:text-gray-500 outline-none w-full"
                >
                  <option value="male" className="bg-gray-50">
                    Male
                  </option>
                  <option value="female" className="bg-gray-50">
                    Female
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!disablePersonal && (
        <div className="bg-white flex flex-col gap-2 mt-5 ">
          <PrimaryButton
            style="pBtn px-20 rounded-md md:py-2 py-3 md:w-fit w-full"
            name="Save"
            func={handleUpdateUser}
            loading={loading}
          />
        </div>
      )}
      <div className="mt-5">
        <div className="mt-2 flex w-full items-center gap-5">
          <div className="flex-col flex md:w-auto w-full gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
              <div className="gap-2 flex w-full bg-gray-50 text-black items-center rounded p-2">
                <i className="uil uil-envelope text-black text-lg" />
                <input
                  disabled={disable}
                  type="email"
                  value={userDetails?.User?.email}
                  className="px-2 disabled: bg-transparent disabled:text-gray-500 outline-none w-full"
                />
              </div>
              <div className="gap-2 flex w-full bg-gray-50 text-black items-center rounded p-2">
                <i className="uil uil-phone text-black text-lg" />
                <input
                  type="number"
                  disabled={disable}
                  value={userDetails?.User?.phoneNo}
                  className="px-2 disabled: bg-transparent disabled:text-gray-500 outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
