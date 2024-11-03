"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "@/firebase/config";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});
export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
