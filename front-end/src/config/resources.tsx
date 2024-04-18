import { IResourceItem } from "@refinedev/core";
import {
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  CirclePlay,
  LayoutDashboard,
  LucideIcon,
  LucideProps,
  MessageCircleMore,
  Settings,
  UsersRound,
} from "lucide-react";

const iconSize = {
  className: "h-5 w-5",
};

const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/dashboard",
    meta: {
      label: "Dashboard",
      icon: <LayoutDashboard {...iconSize} />,
    },
  },
  {
    name: "employees",
    list: "/employees",
    meta: {
      label: "Employees",
      icon: <BriefcaseBusiness {...iconSize} />,
    },
  },
  {
    name: "executivepage",
    list: "/executivepage",
    meta: {
      label: "Executive Page",
      icon: <CalendarPlus {...iconSize} />,
    },
  },
  {
    name: "co-workers",
    list: "/co-workers",
    meta: {
      label: "Co-Workers",
      icon: <UsersRound {...iconSize} />,
    },
  },
  {
    name: "availability",
    list: "/availability",
    meta: {
      label: "Availability",
      icon: <CalendarDays {...iconSize} />,
    },
  },
  {
    name: "create-ra-account",
    list: "/create-ra-account",
    meta: {
      label: "Create RA Account",
      icon: <UsersRound {...iconSize} />,
    },
  },
  {
    name: "ra-welcome",
    list: "/ra-welcome",
    meta: {
      label: "RA welcome",
      icon: <CirclePlay {...iconSize} />,
    },
  },
  {
    name: "messages",
    list: "/messages",
    meta: {
      label: "Messages",
      icon: <MessageCircleMore {...iconSize} />,
    },
  },
  {
    name: "settings",
    list: "/settings",
    meta: {
      label: "Settings",
      icon: <Settings {...iconSize} />,
    },
  },
  // Auth0 management API Resources
  {
    name: "users",
    list: "/users",
    create: "/users",
    edit: "/users/:id",
    show: "/users/:id",
    meta: {
      canDelete: true,
      dataProviderName: "authMan",
    },
  },
  {
    name: "roles",
    list: "/roles",
    meta: {
      dataProviderName: "authMan",
    },
  },
  {
    name: "usersRoles",
    list: "/users/:id/roles",
    edit: "/users/:id/roles",
    meta: {
      canDelete: true,
      dataProviderName: "authMan",
    },
  },
  // {
  //   name: "categories",
  //   list: "/categories",
  //   create: "/categories/create",
  //   edit: "/categories/edit/:id",
  //   show: "/categories/show/:id",
  //   meta: {
  //     canDelete: true,
  //   },
  // },
];

export default resources;
