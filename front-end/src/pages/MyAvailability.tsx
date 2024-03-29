import AvailabilityCalendar from "../components/AvailabilityCalendar";
import MyCalendar from "../components/MyCalendar/MyCalendar";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";

export const MyAvailability = () => {
  const { user } = useAuth0();
  const { getUserRole }: any = useContext(UserDataContext);
  const role = "Resident Education Assistant" // Replace with getUserRole(user?.sub); once we get the database pushing
  const isExec = !(role !== "Resident Education Assistant" && role !== "Resident Education Coordinator");

  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold">
        {isExec ? "Shifts" : "Availability"}
      </h1>
      <div>
        <AvailabilityCalendar id={null} execAccess={null} role={role} />
      </div>
    </div>
  );
};
