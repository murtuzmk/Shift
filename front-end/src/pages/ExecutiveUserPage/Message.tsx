import { useUser } from "../../hooks/useUser";
import React, { useState } from "react";
// PascalCasing
function Message() {
  const { user } = useUser();

  // JSX: JavaScript XML
  return (
    <div className = "text-center">
      <h2 className="text-2xl font-bold"> Executive Page</h2>
      <h3 className="text-lg italic font-semibold"> Welcome, {user?.name}!</h3>
      </div>
  );
}

export default Message;
