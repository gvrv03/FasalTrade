import Navbar from "@/components/Utility/Navbar";
import React from "react";

const Homelayout = ({ children }) => {
  return (
    <div className="container m-auto p-5">
      <Navbar />
     
      {children}
    </div>
  );
};

export default Homelayout;
