"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
    return <div>Please Login first...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
