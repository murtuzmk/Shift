import { useGetIdentity } from "@refinedev/core";
import { useUser } from "../../hooks/useUser";
import { VerifiedUser } from "@/types";
import { useEffect, useState } from "react";
// PascalCasing
function Message() {
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);

  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
  }, [user, userData]);

  // JSX: JavaScript XML
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold"> Executive Page</h2>
      <h3 className="text-lg italic font-semibold"> Welcome, {user?.name}!</h3>
    </div>
  );
}

export default Message;
