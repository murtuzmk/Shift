import { Message, UserData } from "./sample-data";
import React from "react";
import MessagesTopbar from "./messages-topbar";
import { MessagesList } from "./messages-list";

interface MessagesPanelProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function MessagesPanel({
  messages,
  selectedUser,
  isMobile,
}: MessagesPanelProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <MessagesTopbar selectedUser={selectedUser} />

      <MessagesList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
