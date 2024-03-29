import { logoIconLight } from "@/assets";
import Menu from "./Menu";
import MenuContent from "./MenuContent";
import MenuLink from "./MenuLink";
import MenuTrigger from "./MenuTrigger";
import Searchbar from "./Searchbar";
import ProfileOptions from "./ProfileOptions";
import {
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  DoorClosed,
  LayoutDashboard,
  MessageCircleMore,
  UsersRound,
  UserRoundPlus,
} from "lucide-react";
import { User } from "@auth0/auth0-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
interface HeaderProps {
  user: User | undefined;
}

const Header = ({ user }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  console.log(window.location);
  return (
    <header className="flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Menu open={open} onOpenChange={setOpen}>
        <MenuTrigger />
        <MenuContent>
          <MenuLink
            to="/app"
            variant="icon"
            alt="Shift"
            image={logoIconLight}
            onClick={() => setOpen(false)}
          ></MenuLink>
          <MenuLink
            to="dashboard"
            Icon={LayoutDashboard}
            variant="active"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </MenuLink>
          <MenuLink
            to="employees"
            Icon={BriefcaseBusiness}
            onClick={() => setOpen(false)}
          >
            Employees
          </MenuLink>
          <MenuLink to="executivepage" Icon={CalendarPlus}>
            Executive Page
          </MenuLink>
          <MenuLink to="co-workers" Icon={UsersRound}>
            Co-workers
          </MenuLink>
          <MenuLink
            to="availability"
            Icon={CalendarDays}
            onClick={() => setOpen(false)}
          >
            Availability
          </MenuLink>
          <MenuLink to="create-ra-account" Icon={UserRoundPlus}>
            Create RA Account
          </MenuLink>
          <MenuLink to="#" Icon={MessageCircleMore}>
            Messages
          </MenuLink>
        </MenuContent>
      </Menu>
      {/* <Searchbar /> */}
      <div></div>
      {user ? (
        <ProfileOptions user={user} />
      ) : (
        <Skeleton className="w-10 h-10 rounded-full" />
      )}
    </header>
  );
};

export default Header;
