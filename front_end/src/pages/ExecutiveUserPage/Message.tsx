import { useUser } from "../../hooks/useUser";
import React, { useState } from "react";
// PascalCasing
function Message() {
  const { user } = useUser();

  // JSX: JavaScript XML
  return (
    <div className="text-center -mt-4">
      <h2 className="text-2xl font-bold">Executive Page</h2>
      <h3 className="text-xl font-bold">Welcome, {user?.name}!</h3>
    </div>
  );
}

export default Message;
