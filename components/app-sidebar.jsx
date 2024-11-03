"use client";

import * as React from "react";
import {
  SquareChartGantt,
  Frame,
  GalleryVerticalEnd,
  UserRoundPen,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import "@/app/user.css";
import { useAuthContext } from "@/context/authContext";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Dusun Project",
      logo: GalleryVerticalEnd,
      plan: "Member",
    },
  ],
  projects: [
    {
      name: "Projects",
      url: "admin/projects",
      icon: SquareChartGantt,
    },
    {
      name: "Profile",
      url: "admin/profile",
      icon: UserRoundPen,
    },
    {
      name: "Settings",
      url: "admin/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useAuthContext();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...data.user, email: user?.email, name: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
