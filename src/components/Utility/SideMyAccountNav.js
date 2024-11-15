import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
export default function SideMyAccountNav({ drawer }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      {drawer}
    </Box>
  );

  return (
    <div>
      <button
        onClick={toggleDrawer(true)}
        className="uil  text-2xl md:hidden  text-blue-800 uil-draggabledots"
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
