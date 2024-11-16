"use client";
import { useUserAuth } from "@/Context/UserAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Farmers = () => {
  const { fetchUsers } = useUserAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">All Farmers</h2>
      {loading && "Loading..."}
      <div className="grid grid-cols-1 mt-5 gap-5 md:grid-cols-4">
        {users
          ?.filter((item) => item.role === "FARMERUSER") // Filter users by role
          .map((item, index) => {
            return (
              <div
                key={index}
                className="flex gap-5 border justify-between items-center p-5"
              >
                <div>
                  <p>{item?.name}</p>
                  <p className="text-xs text-gray-600">{item?.phoneNo}</p>
                  <p className="text-xs text-gray-600">{item?.email}</p>
                  <p className="text-xs text-gray-600">{item?.role}</p>
                </div>
                <div className="flex-col flex gap-2">
                  <a
                    href={`https://wa.me/${item?.phoneNo}`}
                    className="bg-green-600 text-white text-center font-semibold text-xs p-2 rounded-md"
                    target="_blank"
                  >
                    Contact us
                  </a>
                  <button
                    onClick={() => {
                      router.push(
                        "/MyAccount/Broker/Products?name=" +
                          item?.name +
                          "&phoneNo=" +
                          item?.phoneNo
                      );
                    }}
                    className="bg-blue-500 text-xs p-2 rounded-md font-semibold text-white"
                  >
                    View Crops
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Farmers;
