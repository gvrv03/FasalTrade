"use client";
import { useCallback, useContext } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  checkUserExists,
  createUser,
  fetchUsersAPI,
  SignIn,
} from "@/API/Authentication/Auth";
import { toast } from "react-hot-toast";
import { useAppStore } from "./UseStoreContext";
import { useRouter } from "next/navigation";
const userAuthContext = createContext();
export function UserAuthContexProvider({ children }) {
  const router = useRouter();
  const { Authentication, setAuthentication, setuserDetails } = useAppStore();
  //----------------------------All Blogs State //----------------------------
  const [usersAll, setUsersAll] = useState({
    data: [],
    isLoading: true,
    error: null,
    count: 0,
    totalPages: 0,
  });

  //------------------Check User Exists------------------
  const isUserExist = async (phone, email) => {
    try {
      const response = await checkUserExists(phone, email);
      if (response?.isUnique) {
        return await sendSMS(phone);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //------------------Sign In User------------------
  const signInUser = async (email, password, role) => {
    try {
      const res = await SignIn(email, password, role);
      if (res?.isSuccess) {
        localStorage.setItem("Token", res?.token);
        localStorage.setItem("User", res?.UserName);
        localStorage.setItem("UserID", res?.UserID);
        localStorage.setItem("UserRole", res?.UserRole);
        localStorage.setItem("UserPhone", res?.UserPhone);
        localStorage.setItem("UserEmail", res?.UserEmail);
        localStorage.setItem("UserGender", res?.UserGender);
        fetchUserDetail();
        router.push("/MyAccount/Profile");
        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Sign Out User -------------------
  const signOut = async () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserRole");
    localStorage.removeItem("UserID");
    localStorage.removeItem("User");
    localStorage.removeItem("UserPhone");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("UserGender");
    setuserDetails({});
  };

  //-------------------Create A User -------------------
  const createNewUser = async (number, userData, password, role) => {
    try {
      const res = await createUser(number, userData, password, role);
      if (res?.isSuccess) {
        localStorage.setItem("Token", res?.token);
        localStorage.setItem("User", res?.UserName);
        localStorage.setItem("UserID", res?.UserID);
        localStorage.setItem("UserRole", res?.UserRole);
        localStorage.setItem("UserPhone", res?.UserPhone);
        localStorage.setItem("UserEmail", res?.UserEmail);
        localStorage.setItem("UserGender", res?.UserGender);
        fetchUserDetail();
        router.push("/MyAccount/Profile");

        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Update A User -------------------
  const updateUserDetail = async (userData) => {
    try {
      const res = await UpdateUser(userData);
      if (res?.isSuccess) {
        await fetchUserDetail();
        return toast.success(res?.message);
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------Update A User -------------------
  const fetchUsers = async (userData) => {
    try {
      const res = await fetchUsersAPI(userData);
      if (res?.isSuccess) {
        return res?.users;
      }
    } catch (error) {
      return toast.error(
        error?.response ? error?.response?.data?.errorMsg : error?.message
      );
    }
  };

  //-------------------get User detail -------------------
  const fetchUserDetail = async () => {
    const Token = localStorage.getItem("Token");
    const User = localStorage.getItem("User");
    const UserID = localStorage.getItem("UserID");
    const UserRole = localStorage.getItem("UserRole");
    const UserPhone = localStorage.getItem("UserPhone");
    const UserEmail = localStorage.getItem("UserEmail");
    const UserGender = localStorage.getItem("UserGender");
    if (Token && User && UserID && UserRole) {
      return setuserDetails({
        Token,
        User,
        UserID,
        UserRole,
        UserPhone,
        UserEmail,
        UserGender,
        isLogin: true,
      });
    } else {
      return setuserDetails({
        isLogin: false,
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      fetchUserDetail();
    }
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        signOut,
        createNewUser,
        isUserExist,
        signInUser,
        updateUserDetail,
        usersAll,
        setUsersAll,
        fetchUsers,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
