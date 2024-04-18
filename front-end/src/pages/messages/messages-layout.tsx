import { userData } from "./sample-data";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { MessagesSidebar } from "./messages-sidebar";
import { useCookies } from "react-cookie";
import { MessagesPanel } from "./messages-panel";

type MessagesLayoutProps = {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
};

export function MessagesLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: MessagesLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [cookies, setCookie] = useCookies([
    "react-resizable-panels:layout",
    "react-resizable-panels:collapsed",
  ]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        setCookie("react-resizable-panels:layout", JSON.stringify(sizes));
      }}
      className="h-full items-stretch">
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 8 : 30}
        maxSize={isMobile ? 8 : 32}
        onCollapse={() => {
          setIsCollapsed(true);
          setCookie("react-resizable-panels:collapsed", JSON.stringify(true));
        }}
        onExpand={() => {
          setIsCollapsed(false);
          setCookie("react-resizable-panels:collapsed", JSON.stringify(false));
        }}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}>
        <MessagesSidebar
          isCollapsed={isCollapsed || isMobile}
          links={userData.map((user) => ({
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.avatar,
            variant: selectedUser.name === user.name ? "secondary" : "ghost",
          }))}
          isMobile={isMobile}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <MessagesPanel
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
