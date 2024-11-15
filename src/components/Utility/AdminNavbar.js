"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useAppStore } from "@/Context/UseStoreContext";
import { useUserAuth } from "@/Context/UserAuthContext";
import Image from "next/image";
import SideMyAccountNav from "./SideMyAccountNav";
import UserMenu from "./UserMenu";

const AdminNavbar = ({ shadow, position, drawer }) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const componentPosition = 100;
      const threshold = 100;

      if (scrollPosition > componentPosition - threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <nav
        className={` ${
          isSticky ? `${position} top-0 ${shadow}` : ""
        }  bg-white     z-50 px-5 top-0 w-full   left-0    `}
      >
        <div className="flex flex-wrap justify-between   gap-5 items-center  m-auto   py-3">
          <div className="  flex justify-between   w-full  gap-5">
            <div className="flex  items-center md:w-full py-2 ">
              <Image src="/logo.png" width={20} height={20} />
            </div>

            <div className="flex items-center gap-5">
              <UserMenu />
              <SideMyAccountNav drawer={drawer} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(AdminNavbar);
