"use client";

import { AuthContextProvider } from "@/context/authContext";
import { auth } from "@/firebase/services/auth";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { user } = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      if (auth) {
        setIsAuthenticated(true);
      } else {
        if (!pathname.endsWith("/admin/login")) {
          router.push(`/${user}/admin/login`);
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();
  }, [router, pathname, user]);
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <AuthContextProvider>{children}</AuthContextProvider>;
}
