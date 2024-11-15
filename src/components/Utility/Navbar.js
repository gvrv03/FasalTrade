"use client";
import TopNav from "@/SampleData/TopNav";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import SideHomeNav from "./SideHomeNav";
import { useAppStore } from "@/Context/UseStoreContext";
import { useUserAuth } from "@/Context/UserAuthContext";
import UserMenu from "./UserMenu";
import Image from "next/image";

const NavBar = ({ shadow, position }) => {
  const router = useRouter();
  const { setAuthentication, userDetails } = useAppStore();
  const pathName = usePathname();
  const { signOut } = useUserAuth();
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
        }  bg-white container m-auto    z-50 px-5 top-0 w-full   left-0    `}
      >
        <div className="flex flex-wrap justify-between   gap-5 items-center  m-auto   py-3">
          <div className="  flex justify-between   w-full  gap-5">
            <div className="flex  items-center md:w-full  ">
              <Image src="/logo.png" width={50} height={50} />
            </div>

            <div className="flex  justify-end w-full  gap-5">
              <div className="container items-center gap-5  justify-end  hidden md:flex  m-auto">
                {TopNav.map((text, index) => (
                  <Link
                    className={`  ${
                      pathName.substring(0, 5) === text.location.substring(0, 5)
                        ? " font-bold   pColor   "
                        : ""
                    }  text-gray-500 hover:no-underline text-left  font-semibold py-2 flex gap-2 items-center   hover:font-semibold  transition-all delay-75 ease-linear`}
                    key={index}
                    href={text.location}
                  >
                    <i className={`${text.icon}   text-gray-700`} />
                    <span className=" font-sans"> {text.name}</span>{" "}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-5">
                <UserMenu />
                <SideHomeNav />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(NavBar);
