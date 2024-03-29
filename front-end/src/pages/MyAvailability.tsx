import React, { useContext, useEffect, useState } from "react";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import MyCalendar from "../components/MyCalendar/MyCalendar";
import {useAuth0} from "@auth0/auth0-react";
import { useUser } from "../hooks/useUser";
import UserDataContext from "../context/UserDataContext";

export const MyAvailability = () => {
  const { user } = useAuth0();
  const {getUserRole} : any = useContext(UserDataContext);
  const [isExec, setIsExec] = useState(false);
  
  useEffect(() => {
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
  }, [user]);
  
  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold">
        {isExec ? "Shifts" : "Availability"}</h1>
      <div>
        <AvailabilityCalendar id={null} accFrmExec={false} />
      </div>
    </div>
  );
};
