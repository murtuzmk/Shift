import { logo } from "@/assets";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { LandingNavItems } from "./landing-nav-items";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export const LandingLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <header className="fixed top-0 left-0 z-30 w-full bg-transparent">
        <div className="mx-auto max-w-[120rem] px-8 flex h-14">
          <LandingNavItems items={marketingConfig.mainNav} />
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button size="sm" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};
