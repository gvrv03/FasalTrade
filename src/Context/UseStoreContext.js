"use client";
import generateRandomString from "@/Functions/generateRandomString";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";

const useStoreContext = createContext();
export function UseStoreContextProvider({ children }) {

  //----------------------------UserDetail State //----------------------------
  const [userDetails, setuserDetails] = useState({});

  //----------------------------All Blogs State //----------------------------
  const [blogsAll, setblogsAll] = useState({
    data: [],
    isLoading: true,
    error: null,
    count: 0,
    totalPages: 0,
  });

  //----------------------------ModalState----------------------------
  const [Authentication, setAuthentication] = useState(false);

  //----------------------------Refresh State----------------------------
  const [refresh, setrefresh] = useState("");
  const handleGenerateRandomString = () => {
    const newRandomString = generateRandomString(10); // Change 20 to the desired length
    setrefresh(newRandomString);
  };

  //----------------------------All Home Data State //----------------------------
  const [HomeData, setHomeData] = useState({
    AppName: "EduMingle",
    AppLogo:
      "https://play-lh.googleusercontent.com/FLoXQYURgVleY1gmvKqfQednzHzhIEkdfM3HBi9AdJwPX54YuGb5uFnDXKCiIMYL0Ds=w240-h480-rw",
  });


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setTimeout(() => {
        setAuthentication(true);
      }, 15000);
    }
  }, []);

  return (
    <useStoreContext.Provider
      value={{
        userDetails,
        blogsAll,
        refresh,
        setuserDetails,
        handleGenerateRandomString,
        Authentication,
        setAuthentication,
      }}
    >
      {children}
    </useStoreContext.Provider>
  );
}

export function useAppStore() {
  return useContext(useStoreContext);
}
