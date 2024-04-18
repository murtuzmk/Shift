import { LucideIcon } from "lucide-react";
import {
  ElementType,
  FunctionComponent,
  ReactNode,
  createElement,
} from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

type SidebarIconProps = {
  className?: string;
};

type SidebarLinkProps = {
  to: string;
  icon?: ReactNode;
  children: string | undefined;
};

const SidebarLink = ({ to, icon, children }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      }
    >
      {icon}
      {children}
    </NavLink>
  );
};

export default SidebarLink;
