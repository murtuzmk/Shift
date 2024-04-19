import { landingHeroMockup } from "@/assets";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export const Landing = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <main>
      {/* Hero */}
      <div className="h-fit w-full bg-muted dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] lg:dark:bg-grid-white/[0.1] lg:bg-grid-black/[0.1] relative flex justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-muted [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black_70%)]"></div>

        <div className="mx-auto py-16 md:py-32 space-y-6 z-20">
          <div className="container flex max-w-[56rem] flex-col items-center gap-4 text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl relative bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
              Build your work schedule in minutes.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Powerful scheduling, communication, and task delegation, ensuring
              smooth operations and enhancing collaboration among team members.
            </p>
          </div>
          <div className="container flex max-w-[56rem] flex-col items-center gap-4 text-center">
            <Button
              className="mt-6"
              size="lg"
              onClick={() => loginWithRedirect({})}>
              Get Started
            </Button>
            <img src={landingHeroMockup} alt="Mockup" />
          </div>
        </div>
      </div>
    </main>
  );
};
