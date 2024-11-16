import Navbar from "@/components/Utility/Navbar";
import "./globals.css";
import { UseStoreContextProvider } from "@/Context/UseStoreContext";
import { UserAuthContexProvider } from "@/Context/UserAuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FasalTrade",
  description: "FasalTrade ",
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
            <Toaster />
            {children}
          </UserAuthContexProvider>
        </UseStoreContextProvider>
      </body>
    </html>
  );
}
