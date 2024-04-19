import { logo } from "@/assets";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { LayoutNavItemsProps } from "@/types";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Logo } from "../logo";
import { MobileNav } from "./mobile-nav";

export const LandingNavItems = ({ items, children }: LayoutNavItemsProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10 w-full">
      <Logo className="hidden md:flex" />
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {/*  */}
          {items?.map((item, index) =>
            item.href.includes("#") ? (
              <HashLink
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}>
                {item.title}
              </HashLink>
            ) : (
              <NavLink
                key={index}
                to={item.disabled ? "#" : item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    isActive ? "text-foreground" : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )
                }>
                {item.title}
              </NavLink>
            )
          )}
        </nav>
      ) : null}
      <div className="flex justify-between items-center md:hidden w-full">
        <Logo />
        <button
          className="flex items-center space-x-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </div>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};
