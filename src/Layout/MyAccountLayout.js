"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import AdminNavbar from "@/components/Utility/AdminNavbar";
import { UserAccountNav } from "@/SampleData/TopNav";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Divider, Toolbar } from "@mui/material";
import { useState } from "react";
import { useAppStore } from "@/Context/UseStoreContext";

const drawerWidth = 200;

function MyAccountLayout({ window, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { userDetails } = useAppStore(); // Fetch userDetails to check admin role
  const [openDashboard, setOpenDashboard] = useState(false);

  // Check if user is an admin
  const isAdmin = userDetails?.isRoot || userDetails?.isAdmin;
  
  const drawer = (
    <div className="mt-5 text-sm">
      {UserAccountNav.map((item, index) => {
        // Only show Dashboard to admins
        if (item.name === "Dashboard" && !isAdmin) {
          return null; // Hide Dashboard if user is not admin
        }

        return (
          <div key={index}>
            <button
              className={`${
                pathname == item?.location && "bg-blue-50 font-semibold"
              }
              text-left cursor-pointer text-black hover:text-black hover:no-underline py-2 px-5 hover:bg-blue-50 hover:font-semibold hover:my-2 transition-all delay-75 flex gap-5 w-full`}
              onClick={() => {
                if (item.name === "Dashboard") {
                  setOpenDashboard(!openDashboard);
                } else {
                  router.push(item?.location);
                }
              }}
            >
              <i className={`${item.icon}`} />
              <span>{item.name}</span>

              {/* Arrow Icon that toggles based on openDashboard */}
              {item.name === "Dashboard" && (
                <i
                  className={`ml-auto transition-transform ${
                    openDashboard ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼ {/* You can use a different arrow icon here */}
                </i>
              )}
            </button>

            {item.name === "Dashboard" && openDashboard && (
              <div className="ml-5 text-xs">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    className={`${
                      pathname == subItem?.location && "bg-blue-50 font-semibold"
                    }
                    text-left text-black hover:text-black hover:no-underline py-2 px-5 hover:bg-blue-50 hover:font-semibold hover:my-2 transition-all delay-75 flex gap-5 w-full`}
                    key={subIndex}
                    href={subItem?.location}
                  >
                    <i className={`${subItem.icon}`} />
                    <span>{subItem.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <AdminNavbar drawer={drawer} />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar/>
        {children}
      </Box>
    </Box>
  );
}

MyAccountLayout.propTypes = {
  window: PropTypes.func,
};

export default MyAccountLayout;
