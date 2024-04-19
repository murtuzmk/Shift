import { userData } from "./sample-data";
import { useEffect, useState } from "react";
import { MessagesSidebar } from "./messages-sidebar";
import { MessagesPanel } from "./messages-panel";
import { cn } from "@/lib/utils";
import { useMobileLayout } from "./hooks/useMobileLayout";

export function MessagesLayout() {
  const [selectedUser, setSelectedUser] = useState(userData[0]);
  const { isMobile } = useMobileLayout();
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out max-w-72 border border-r-2"
        )}>
        {/* <MessagesSidebar
          links={userData.map((user) => ({
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.avatar,
            variant: selectedUser.name === user.name ? "secondary" : "ghost",
          }))}
          isMobile={isMobile}
        /> */}
      </div>
      <div className="flex-1">
        <MessagesPanel
          messages={selectedUser.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
