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

  const drawer = (
    <div className="p-5 flex flex-col gap-5 ">
      <Link href="/MyAccount/Profile" className={`w-full `}>
        Profile
      </Link>

      {userDetails.UserRole === "FARMERUSER" && (
        <Link href="/MyAccount/Farmer/Brokers" className={`w-full `}>
          Brokers
        </Link>
      )}
      {userDetails.UserRole === "BROKERUSER" && (
        <Link href="/MyAccount/Broker/Farmers" className={`w-full `}>
          Farmers
        </Link>
      )}
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
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

MyAccountLayout.propTypes = {
  window: PropTypes.func,
};

export default MyAccountLayout;
