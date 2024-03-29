import { Button } from "@/components/ui/button";
import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  DoorClosed,
  LayoutDashboard,
  MessageCircleMore,
  UsersRound,
  UserRoundPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { logoIconLight } from "@/assets";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img className="w-9" src={logoIconLight} alt="Shift" />
          </Link>
          {/* Notification */}
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/* Sidebar Items */}
            <SidebarLink to="dashboard" Icon={LayoutDashboard} variant="active">
              Dashboard
            </SidebarLink>
            <SidebarLink to="employees" Icon={BriefcaseBusiness}>
              Employees
            </SidebarLink>
            <SidebarLink to="executivepage" Icon={CalendarPlus}>
              Executive Page
            </SidebarLink>
            <SidebarLink to="co-workers" Icon={UsersRound}>
              Co-workers
            </SidebarLink>
            <SidebarLink to="availability" Icon={CalendarDays}>
              Availability
            </SidebarLink>
            <SidebarLink to="create-ra-account" Icon={UserRoundPlus}>
              Create RA Account
            </SidebarLink>
            <SidebarLink to="#" Icon={MessageCircleMore}>
              Messages
            </SidebarLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
