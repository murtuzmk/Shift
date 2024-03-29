import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ExecutivePage from "../pages/ExecutivePage";
import { useUser } from "../hooks/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";


interface TileClassNameArgs {
  date: Date;
  view: string;
}

const AvailabilityCalendar: React.FC<{ id: string | null, execAccess : boolean | null, role: string | null}> =({id, execAccess, role}) => {
  // Explicitly type freeDays as an array of strings
  const [freeDays, setFreeDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"month">("month");
  const {user} = useAuth0();
  const userid = id || (user && user.sub ? user.sub.split("|")[1] : null);
  //const userRole = role;
  const userRole = role !== null ? role : "Resident Assistant";
  const isExec = userRole !== "Resident Assistant";
  if (execAccess == null) {
    execAccess = false;
  }

  /* Fetch the free days from the REST API */
  const fetchFreeDays = () => {
    // Update the freeDays state with the fetched data
    fetch("http://localhost:8080/ra/${userid}/get-preferences")
    .then((response) => response.json())
    .then((data) => {
      const dateStr: string= new Date(data).toISOString().split("T")[0];
      setFreeDays([dateStr]);
    });
  }

  /* This is for when submit is enacted, tells us which days are left to be saved */
  const setSavedFreeDays = (dates : string[]) => {
    fetch("http://localhost:8080/ra/${userid}/add-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        dates: dates,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      // Assuming you have a state variable 'freeDays' and a setter function 'setFreeDays'
      setFreeDays([...freeDays, ...dates]); // Append the new dates to the existing ones
    });
  }
  


  /* useEffect will call on fetch free days once, when the component is mounted */
  useEffect(() => {
    fetchFreeDays();
  }, []);

  const addFreeDays = (dates : string[]) => {
    fetch("http://localhost:8080/root/${userid}/add-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        dates: dates,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      // Assuming you have a state variable 'freeDays' and a setter function 'setFreeDays'
      setFreeDays([...freeDays, ...dates]); // Append the new dates to the existing ones
    });
  }


  /* useEffect will call on fetch free days once, when the component is mounted */
  useEffect(() => {
    fetchFreeDays();
  }, []);


  const minDaysRequired = parseInt(
    localStorage.getItem("currentValue") || "10"
  );
  const numDaysNeeded =
    minDaysRequired -
    freeDays.length; /* Replace with actual number later */ /* IMPLEMENT SOON *

  /* Selecting the Days on Calendar */
  const onChange = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    const dateStr: string = date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
    const index: number = freeDays.findIndex((d) => d === dateStr);
    if (index >= 0) {
      // If the date is already selected, remove it from the array
      setFreeDays(freeDays.filter((_, i) => i !== index));
    } else {
      // Otherwise, add the date to the array
      setFreeDays([...freeDays, dateStr]);
    }
    setView("month"); // Always will be on monthly view
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
      /* When the month switches this will reload the events for the month*/
      freeDays.filter((day) => day < startOfMonth || day > endOfMonth)
    );
  };

  /*useEffect(() => {
    const loadedFreeDays = localStorage.getItem("savedFreeDays");
    if (loadedFreeDays) {
      setSavedFreeDays(JSON.parse(loadedFreeDays));
      setFreeDays(JSON.parse(loadedFreeDays));
    }
  }, []); */

  /* Clicking the Submit Schedule Button */
  const onSubmit = () => {
    /* Warning if they don't have the minimum number of days working */
    if (freeDays.length < minDaysRequired) {
      const userConfirmation = window.confirm(
        "You do not meet the minimum requirement, are you sure you want to submit"
      );
      /* Exit if they hit cancel */
      if (!userConfirmation) {
        return;
      }
    }

    /* Send the freeDays array to the local storage */
    /*/*localStorage.setItem("savedFreeDays", JSON.stringify(freeDays));
    setSavedFreeDays(freeDays);
    console.log(freeDays);*/
    setSavedFreeDays(freeDays);
    window.alert("Availability Successfully Sent Out");
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
      <div className="flex w-full justify-center px-4 relative">
        {!execAccess && (
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

        )}
        {/* Conditional message positioned to the right */}
        {!execAccess && !execAccess && numDaysNeeded > 0 && (
          <div className="absolute right-0 pr-4">
            <span className="text-red-500 italic">
              Need {numDaysNeeded} more days
            </span>
          </div>
        )}
        
        
      </div>
      {isExec && (
      <style>{`
      .react-calendar {
        width: 80%; /* Adjust this value to make the calendar wider */
        max-width: none; /* Remove any maximum width restrictions */
        font-size: 16px; /* Increase the base font size to scale up text elements */
      }
      .react-calendar__tile {
        height: 80px; /* Adjust this value to increase the tile height */
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
    )}
    {!isExec && (
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
    )}
    </div>
  );
};

export default AvailabilityCalendar;
