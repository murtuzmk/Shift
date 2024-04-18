import { PropsWithChildren } from "react";
import { BreadcrumbHeader } from "../breadcrumb/breadcrumb";
import { Sidebar } from "../sidebar";
export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col relative">
        <div className="flex items-end h-16 lg:h-20 px-8">
          <BreadcrumbHeader />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export * from "./landing-layout";
