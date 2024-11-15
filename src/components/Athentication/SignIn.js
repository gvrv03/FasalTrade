import { useUserAuth } from "@/Context/UserAuthContext";
import React, { useState } from "react";
import { PrimaryButton } from "../Utility/ButtonsAll";

const SignIn = ({ setisLoginState }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const { signInUser } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    if (email.length === 0 || password.length === 0) {
      toast.error("Fill the Fields");
      return setloading(false);
    }
    await signInUser(email, password);
    return setloading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-5 flex-col w-full ">
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <i className="uil uil-user-plus bg-gray-100 px-4 py-3" />
        <input
          type="email"
          onChange={(e) => {
            setemail(e.target.value);
          }}
          value={email}
          name="email"
          required={true}
          placeholder="Username"
          className=" w-[100%] outline-none "
        />
      </div>
      <div className="border flex gap-5 items-center  rounded-md  border-gray-200 ">
        <i className="uil uil-lock bg-gray-100 px-4 py-3" />
        <input
          type="password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          value={password}
          name="password"
          required={true}
          placeholder="Password"
          className=" w-[100%] outline-none "
        />
      </div>
      <div className="text-right text-blue-800 font-semibold ">
        Forgot Password ?
      </div>
      <PrimaryButton name="Sign In" style="px-5 py-3" loading={loading} />
      <div className="text-gray-500 text-center" >
        If you Don't have an account ?{" "}
        <button
        className="text-blue-800 font-semibold"
          onClick={() => {
            setisLoginState(false);
          }}
        >
          Create an Account
        </button>
      </div>
    </form>
  );
};

export default SignIn;
