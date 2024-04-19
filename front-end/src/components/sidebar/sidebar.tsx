import { useLogout, useMenu } from "@refinedev/core";
import { NavLink } from "react-router-dom";
import SidebarLink from "./sidebar-link";
import { ElementType } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { logo } from "@/assets";
import { ModeToggle } from "../mode-toggle";

export const Sidebar = () => {
  const { mutate, isLoading } = useLogout();
  const { menuItems } = useMenu();

  return (
    <nav className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-end px-6 lg:h-20 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img className="w-8" src={logo} alt="Shift" />
          </Link>
          {/* Notification */}
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-4 py-4 text-sm font-medium lg:px-4 space-y-2">
            {/* Sidebar Items */}
            {menuItems.map(
              (item) =>
                item.meta?.dataProviderName != "authMan" && (
                  <SidebarLink
                    key={item.key}
                    to={item.route ?? "/"}
                    icon={item.icon}>
                    {item.label}
                  </SidebarLink>
                )
            )}
          </nav>
        </div>
        <ModeToggle />
        <button type="button" disabled={isLoading} onClick={() => mutate()}>
          Logout
        </button>
      </div>
    </nav>
  );
};
