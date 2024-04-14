import { Link, NavLink } from "react-router-dom";
import { landingHeroMockup, logo } from "@/assets";
import { HashLink } from "react-router-hash-link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/themes/mode-toggle";

export const Landing: React.FC = () => {
  const items = [
    {
      title: "Features",
      href: "/#features",
      disabled: true,
    },
  ];
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-10 bg-transparent relative h-20 w-full">
        <div className="absolute flex items-center justify-between py-4 inset-x-8 md:inset-x-12 lg:inset-x-16">
          <div className="flex gap-6 md:gap-10">
            <Link to="/" className="hidden items-center space-x-2 md:flex">
              <img className="h-8" src={logo} alt="Shift" />
              <span className="hidden font-bold sm:inline-block">Shift</span>
            </Link>
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
                        item.disabled && "cursor-not-allowed opacity-80",
                      )}
                    >
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
                          item.disabled && "cursor-not-allowed opacity-80",
                        )
                      }
                    >
                      {item.title}
                    </NavLink>
                  ),
                )}
              </nav>
            ) : null}
            <button
              className="flex items-center space-x-2 md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X /> : <Menu />}
              <span className="font-bold">Menu</span>
            </button>
            {showMobileMenu && items && (
              // <MobileNav items={items}>{children}</MobileNav>
              <div>Hi</div>
            )}
          </div>
          <nav className="flex items-center space-x-4">
            <ModeToggle />
            <Button size="sm" onClick={() => loginWithRedirect()}>
              Login
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="transition-all">
          <section className="relative h-[64rem] bg-muted">
            <div className="h-[64rem] w-full bg-muted dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] lg:dark:bg-grid-white/[0.1] lg:bg-grid-black/[0.1] absolute z-0 -top-[5.5rem] transition-all">
              {/* Radial gradient for the container to give a faded look */}
              <div className="h-full relative">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-muted [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black_70%)]"></div>
              </div>
            </div>
            <div className="absolute inset-0 mx-auto py-8 md:py-16 space-y-6 z-0">
              <div className="container flex max-w-[56rem] flex-col items-center gap-4 text-center z-0">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground">
                  Build your work schedule in minutes.
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  Powerful scheduling, communication, and task delegation,
                  ensuring smooth operations and enhancing collaboration among
                  team members.
                </p>
              </div>
              <div className="container flex max-w-[56rem] flex-col items-center gap-4 text-center">
                <div className="space-x-4 mt-6">
                  <Button size="lg" onClick={() => loginWithRedirect({})}>
                    Get Started
                  </Button>
                </div>
                <img src={landingHeroMockup} alt="Mockup" />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
