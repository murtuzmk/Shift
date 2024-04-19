import { supabase } from "@/lib/supbaseClient";

export const getChatToken = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke("new-chat-token", {
    body: JSON.stringify({ user_id: userId }),
  });
  return data.token;
};
