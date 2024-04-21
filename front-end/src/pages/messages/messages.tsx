// import { VerifiedUser } from "@/types";
// import { useGetIdentity, useList } from "@refinedev/core";
// import React, { useEffect, useState } from "react";

// import { ChatEngine, getOrCreateChat } from "react-chat-engine";

// export const Messages = () => {
//   const [username, setUsername] = useState("");
//   const { data: usersData } = useList({
//     resource: "users",
//     dataProviderName: "authMan",
//   });
//   const [auth0Usernames, setAuth0Usernames] = useState<string[] | null>(null);

//   const { data: userData } = useGetIdentity();
//   const [user, setUser] = useState<VerifiedUser | null>(null);

//   useEffect(() => {
//     if (userData) {
//       setUser(userData as VerifiedUser);
//     }
//     if (usersData) {
//       const users = usersData.data as VerifiedUser[];
//       const usersUsernames = users.map((user) =>
//         user.name!.toLowerCase().replace(" ", "_")
//       );
//       setAuth0Usernames(usersUsernames);
//     }
//   }, [userData, usersData]);
//   useEffect(() => {
//     if (auth0Usernames) {
//       console.log("nice");
//     }
//   }, [auth0Usernames]);

//   return (
//     user && (
//       // <ChatEngine
//       //   projectID="8a111679-30ee-4979-a116-571fa89b4558"
//       //   userName={user.name?.toLowerCase().replace(" ", "_")}
//       //   userSecret={user.user_id}
//       //   renderNewChatForm={(creds: any) => renderChatForm(creds)}
//       // />
//       <ChatEngine
//         height="100vh"
//         projectID="8a111679-30ee-4979-a116-571fa89b4558"
//         userName="sample"
//         userSecret="sample"
//         renderNewChatForm={(creds: any) => renderChatForm(creds)}
//       />
//     )
//   );
// };

import { VerifiedUser } from "@/types";
import { useGetIdentity } from "@refinedev/core";
import { useEffect, useState } from "react";

import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import fetchWrapper from "@/context/fetch-wrapper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Messages = () => {
  const [username, setUsername] = useState("");
  const [usersChat, setUsersChat] = useState<
    { value: string; label: string }[]
  >([]);

  function createDirectChat(creds: any) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
    // window.location.reload();
  }

  function renderChatForm(creds: any) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between">
              {username
                ? usersChat.find((framework) => framework.value === username)
                    ?.label
                : "Select user..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search user..." />
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {usersChat.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setUsername(
                          currentValue === username ? "" : currentValue
                        );
                        setOpen(false);
                      }}>
                      <Check
                        key={`${framework.value}-check`}
                        className={cn(
                          "mr-2 h-4 w-4",
                          username === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button key="nice" onClick={() => createDirectChat(creds)}>
          Create DM
        </Button>
      </div>
    );
  }

  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const [groupChat, setGroupChat] = useState<string>("");

  async function createGroupChat() {
    const options = {
      method: "POST",
      headers: {
        "Project-ID": "8a111679-30ee-4979-a116-571fa89b4558",
        "User-Name": user?.email,
        "User-Secret": user?.email,
      },
      body: JSON.stringify({ title: groupChat, is_direct_chat: false }),
    };
    const response = await fetchWrapper(
      "https://api.chatengine.io/chats/",
      options
    );
    window.location.reload();
  }

  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
  }, [userData]);
  useEffect(() => {
    if (user) {
      (async () => {
        const options = {
          method: "GET",
          headers: {
            "PRIVATE-KEY": "0e59da6a-ca0d-4f13-884e-c87675cd0880",
          },
        };
        const response = await fetchWrapper(
          "https://api.chatengine.io/users/",
          options
        );
        const data = await response.json();
        let usernames = data.map((userData: any) => {
          return {
            value: userData.username,
            label: userData.username,
          };
        });
        usernames = usernames.filter(
          (username: any) => username.value !== user.email
        );
        setUsersChat(usernames);
      })();
    }
  }, [user]);
  // useEffect(() => {
  //   console.log(groupChat);
  // }, [groupChat]);

  return (
    <>
      <div>
        <Label htmlFor="groupChat">New Group Chat</Label>
        <Input
          type="text"
          id="groupChat"
          placeholder="Group Chat"
          onChange={(e) => setGroupChat(e.target.value)}
        />
        <Button onClick={createGroupChat}>Create Group Chat</Button>
      </div>
      {user && (
        <ChatEngine
          height="80vh"
          userName={user.email}
          userSecret={user.email}
          projectID="8a111679-30ee-4979-a116-571fa89b4558"
          renderNewChatForm={(creds: any) => renderChatForm(creds)}
        />
      )}
    </>
  );
};
