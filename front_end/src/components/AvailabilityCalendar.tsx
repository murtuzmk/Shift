import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface TileClassNameArgs {
  date: Date;
  view: string;
}

const AvailabilityCalendar: React.FC = () => {
  // Explicitly type freeDays as an array of strings
  const [freeDays, setFreeDays] = useState<string[]>([]);
  const [savedFreeDays, setSavedFreeDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  /* Selecting the Days on Calendar */
  const onChange = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    // Ensure date handling includes TypeScript types
    const dateStr: string = date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    const index: number = freeDays.findIndex((d) => d === dateStr);
    if (index >= 0) {
      // If the date is already selected, remove it from the array
      setFreeDays(freeDays.filter((_, i) => i !== index));
    } else {
      // Otherwise, add the date to the array
      setFreeDays([...freeDays, dateStr]);
    }
  };
  const onActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate !== null) {
      setCurrentMonth(activeStartDate);
    }
  };

  const clearCurrentMonthSelections = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    setFreeDays(
      freeDays.filter((day) => day < startOfMonth || day > endOfMonth)
    );
  };
  useEffect(() => {
    const loadedFreeDays = localStorage.getItem("savedFreeDays");
    if (loadedFreeDays) {
      setSavedFreeDays(JSON.parse(loadedFreeDays));
      setFreeDays(JSON.parse(loadedFreeDays));
    }
  }, []);

  /* Clicking the Submit Schedule Button */
  const onSubmit = () => {
    // Send the freeDays array to the backend
    localStorage.setItem("savedFreeDays", JSON.stringify(freeDays));
    setSavedFreeDays(freeDays);
    console.log(freeDays);
  };

  const tileClassName = ({ date, view }: TileClassNameArgs): string | null => {
    if (view === "month") {
      let dateStr: string = date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
      // Ensure visual feedback is based on `freeDays`
      if (freeDays.includes(dateStr)) {
        return "freeDay"; // Applies the class if the day is in `freeDays`
      }
    }
    return null; // Return null if no specific class should be applied
  };

  return (
    <div
      className="space-y-5"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Calendar
        onChange={(value, event) => onChange(value as Date, event)}
        onActiveStartDateChange={onActiveStartDateChange}
        value={new Date()} // Convert each free day back to a Date object
        view="month"
        tileClassName={tileClassName}
      />
      <div className="flex space-x-10">
        <button
          onClick={clearCurrentMonthSelections}
          className="w-32 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs"
        >
          Clear
        </button>
        <button
          onClick={onSubmit}
          className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
        >
          Submit Schedule
        </button>
      </div>

      <style>{`
      .react-calendar {
        width: 80%; /* Adjust this value to make the calendar wider */
        max-width: none; /* Remove any maximum width restrictions */
        font-size: 16px; /* Increase the base font size to scale up text elements */
      }
      .react-calendar__tile {
        height: 100px; /* Adjust this value to increase the tile height */
        width: 80px; /* Adjust this value to increase the tile width */
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2em; /* Scale up the font size within each tile */
      }
      .react-calendar__navigation button {
        font-size: 1.4em; /* Scale up the navigation buttons */
      }

      .freeDay {
        background-color: #0f0 !important;
        color: white;
      }
    `}</style>
    </div>
  );
};

export default AvailabilityCalendar;
