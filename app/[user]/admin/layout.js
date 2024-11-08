"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContextProvider, useAuthContext } from "@/context/authContext";
import Preloader from "@/layout/Preloader";
import { usePathname, useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import LoginDirect from "@/components/alerts/LoginDirect";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, authLoading } = useAuthContext();
  const { user: userParam } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${userParam}/admin/login`);
    }
  }, [user, authLoading]);

  if (authLoading) {
    return <Preloader />;
  }

  if (pathname.includes("/login")) {
    return <>{children}</>;
  }

  if (!authLoading && user == null) {
    // return <div>Please Login first...</div>;
    // return alert("Please Login first...");
    return (
      <div className="flex items-center justify-center h-screen">
        <LoginDirect />
      </div>
    );
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbSegments = pathSegments.slice(2);

  const breadcrumbItems = breadcrumbSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 3).join("/")}`;
    const displayText = segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink href={href}>{displayText}</BreadcrumbLink>
        {index < breadcrumbSegments.length - 1 && <BreadcrumbSeparator />}
      </BreadcrumbItem>
    );
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
