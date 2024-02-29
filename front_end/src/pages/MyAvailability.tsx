import AvailabilityCalendar from "../components/AvailabilityCalendar";
import MyCalendar from "../components/MyCalendar";

export const MyAvailability = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-center font-bold"> My Availability</h1>
      <div>
        <AvailabilityCalendar />
      </div>
    </div>
  );
};
