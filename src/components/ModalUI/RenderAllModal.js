"use client";
import { useAppStore } from "@/Context/UseStoreContext";
import React from "react";
import AuthenticationModal from "./AuthenticationModal";

const RenderAllModal = () => {
  const { Authentication, setAuthentication } = useAppStore();
  return (
    <>
      <AuthenticationModal
        state={Authentication}
        setstate={setAuthentication}
      />
    </>
  );
};

export default RenderAllModal;
