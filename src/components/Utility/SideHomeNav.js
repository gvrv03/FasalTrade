import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TopNav from '@/SampleData/TopNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideHomeNav() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const pathName = usePathname();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="flex  justify-end w-full  gap-5">
        
      <div className="container items-center gap-5 p-5 justify-end md:flex  m-auto">
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
            <span className=" font-sans"> {text.name}</span>{" "}
          </Link>
        ))}
      </div>
    </div>
    </Box>
  );

  return (
    <div>
      <button onClick={toggleDrawer(true)} className='uil  text-2xl md:hidden  text-blue-800 uil-draggabledots' />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
