import Navbar from "@/components/Utility/Navbar";
import "./globals.css";
import { UseStoreContextProvider } from "@/Context/UseStoreContext";
import RenderAllModal from "@/components/ModalUI/RenderAllModal";
import { UserAuthContexProvider } from "@/Context/UserAuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "SIH 2024 ",
  description: "Official Website of DRDO Interview ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
      </head>
      <body className="text-sm md:text-base">
        <UseStoreContextProvider>
          <UserAuthContexProvider>
            <Toaster  />
            <RenderAllModal />
            {children}
          </UserAuthContexProvider>
        </UseStoreContextProvider>
      </body>
    </html>
  );
}
