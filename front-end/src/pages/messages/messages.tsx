import { StreamChat } from "stream-chat";
import { MessagesSidebar } from "./messages-sidebar";
import { MessagesLayout } from "./messages-layout";
import { useCookies } from "react-cookie";

const apiKey = "f9bffp8y2ejs";
const client = StreamChat.getInstance(apiKey);

import { createClient } from "@supabase/supabase-js";
import { publicAnonKey } from "./supabase-config";
import { useEffect } from "react";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  // "https://ljniqvfwadhdjycxfxfu.supabase.co",
  "http://127.0.0.1:54321",
  publicAnonKey
);

export const Messages = () => {
  const [cookies, setCookie] = useCookies([
    "react-resizable-panels:layout",
    "react-resizable-panels:collapsed",
  ]);
  const layout = cookies["react-resizable-panels:layout"];
  const defaultLayout = layout ? layout : undefined;

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.functions.invoke("hello-world", {
        body: { name: "Functions" },
      });
      console.log(data, error);
    })();
  }, []);

  return (
    <div className="border text-sm absolute inset-0 bg-background">
      <MessagesLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
    </div>
  );
};

const Sidebar = () => {
  return <div>Sidebar</div>;
};
