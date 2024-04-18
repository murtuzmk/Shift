import { logo } from "@/assets";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={cn("items-center space-x-2 flex", className)}>
      <img className="h-8" src={logo} alt={siteConfig.name} />
      <span className="hidden font-bold sm:inline-block text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
};
