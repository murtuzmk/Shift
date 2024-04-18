import React, { useContext, useEffect, useState } from "react";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import MyCalendar from "../components/MyCalendar/MyCalendar";
import UserDataContext from "../context/UserDataContext";
import { useGetIdentity } from "@refinedev/core";
import { VerifiedUser } from "@/types";

export const MyAvailability = () => {
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const { getUserRole }: any = useContext(UserDataContext);
  const [isExec, setIsExec] = useState(false);

  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
    user &&
      (async () => {
        const userRole = await getUserRole(user?.sub);
        if (
          userRole == "Resident Education Assistant" ||
          userRole == "Resident Education Coordinator"
        ) {
          setIsExec(true);
          console.log("User is an exec" + userRole);
        }
      })();
  }, [user, userData]);

  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold">
        {isExec ? "Shifts" : "Availability"}
      </h1>
      <div>
        <AvailabilityCalendar id={null} accFrmExec={false} />
      </div>
    </div>
  );
};
