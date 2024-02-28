// This page allows the user to modify the account info, notfication preferences

import { useState } from "react";
import { useUser } from "../hooks/useUser";

// and integration preferences
export const Settings = () => {
  const [deleting, setDeleting] = useState(false);
  const { user } = useUser();

  return (
    <div className="text-2xl font-semibold flex flex-col gap-8 justify-center items-center h-full">
      <h1>Settings</h1>
      <button
        className=" text-xl bg-gray-500 p-4 rounded-lg hover:bg-gray-600"
        onClick={() => setDeleting(true)}
      >
        Delete My Account
      </button>
      <div
        className={` ${
          deleting ? "flex flex-col" : "hidden"
        } absolute inset-0 w-72 h-72 m-auto bg-gray-400 rounded-lg justify-center items-center gap-4`}
      >
        <h1>Are you sure?</h1>
        <div className="flex gap-x-6">
          <button className="bg-green-500 p-4 rounded-lg">Yes</button>
          <button
            className="bg-red-500 p-4 rounded-lg"
            onClick={() => setDeleting(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
