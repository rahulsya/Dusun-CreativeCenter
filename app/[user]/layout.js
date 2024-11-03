import { AuthContextProvider } from "@/context/authContext";
import React from "react";

function UserLayout({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default UserLayout;
