import axios from "axios";
import {
  checkUserExistURL,
  checkUserURL,
  RegisterUserURL,
  Fast2SMSURL,
  SendSMSToUserURL,
  signInUserURL,
  getUsersURL,
} from "@/Helpers/allLinks";

//------------------Fetch Users------------------
export const fetchUsersAPI = async (data) => {
  const page = data?.page ? data?.page : 1;

  const url = getUsersURL + `?page=${page}`;
  const res = await axios.get(url);
  return await res?.data;
};

//------------------Sign in User------------------
export const SignIn = async (email, password,role) => {
  const url = signInUserURL;
  const res = await axios.post(url, { email, password,role });
  return await res?.data;
};

//------------------Check ser Exists------------------
export const checkUserExists = async (number, email) => {
  const url = checkUserExistURL;
  const res = await axios.post(url, { phoneNo: number, email });
  return await res?.data;
};

//------------------Create new User------------------
export const createUser = async (number, userData, password, role) => {
  const url = RegisterUserURL;
  const dataUser = {
    phoneNo: number,
    userData: userData,
    password: password,
    role: role,
  };
  const res = await axios.post(url, dataUser);
  return await res?.data;
};

//------------------Check User------------------
export const checkUser = async () => {
  const url = checkUserURL;
  const dataUser = {
    token: localStorage.getItem("token"),
  };
  const res = await axios.post(url, dataUser);
  return await res?.data;
};
