import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAppStore } from "@/Context/UseStoreContext";
import { useUserAuth } from "@/Context/UserAuthContext";
import { PrimaryButton } from "./ButtonsAll";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { userDetails } = useAppStore();
  const { signOut } = useUserAuth();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (userDetails?.isLogin) {
    return (
      <>
        <PrimaryButton name="Logout" func={signOut} style="w-fit px-3 py-1" />
      </>
    );
  } else {
    return (
      <PrimaryButton
        name="SignIn"
        func={() => {
          router.push("/Authentication/SignIn");
        }}
        style="w-fit px-3 py-1"
      />
    );
  }
}
