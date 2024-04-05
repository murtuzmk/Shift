import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ExecutivePage from "../pages/ExecutivePage";
import { useUser } from "../hooks/useUser";
import { useAuth0 } from "@auth0/auth0-react";

import UserDataContext from "../context/UserDataContext";
import Dropdown from "../pages/ExecutiveUserPage/DropDown";

import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button";

interface TileClassNameArgs {
  date: Date;
  view: string;
}

/*
 * AvailabilityCalendar component is a calendar that allows the user to select their availability.
 * It is used from two mediums: The Executive Page and the the Availability/Shifts Page.
 * 
 * Executive Page: From the executive page it is used to view the RA schedules for approval and assignment.
 *  For this reason, we have props to pass in so that the id of the RA can be passed in and their schedule will be fetched
 * 
 * Availability/Shifts Page: From the availability/shifts page it is used to allow the RA to select their availability. And then
 *  in the perspective of the executive, they can select an "availability" but its actually just shifts that will pop up as shifst to
 *  pick up
 */

const AvailabilityCalendar: React.FC<{ id: string | null, accFrmExec : boolean | null}> =({id, accFrmExec}) => {
  // Explicitly type freeDays as an array of strings
  const [freeDays, setFreeDays] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<"month">("month");
  const {user} = useAuth0();
  const {getUserRole} : any = useContext(UserDataContext);
  const [isExec, setIsExec] = useState(false);
  const userid = id || (user && user.sub ? user.sub.split("|")[1] : null);
  const execAccess = accFrmExec || false;
  /* Check if user is an executive */

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
          console.log("\n User id is +" + userid);
        }
      })();
  }, [user]);
  const { toast } = useToast();



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
    if (!isExec && freeDays.length < minDaysRequired) {
      const userConfirmation = window.confirm(
        "You do not meet the minimum requirement, are you sure you want to submit"
      );
      /* Exit if they hit cancel */
      if (!userConfirmation) {
        return;
      }

      if(userConfirmation) {
        window.alert("Availability Successfully Sent Out");
      };
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


  /* Checkboxes */
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  const handleCheckboxChange = (checkboxNumber: number) => {
    if (checkboxNumber === 1) {
      setIsChecked1(!isChecked1);
      if (isChecked2) {
        setIsChecked2(!isChecked2);
      }
      if (isChecked3) {
        setIsChecked3(false);
      }
    } else if (checkboxNumber === 2) {
      setIsChecked2(!isChecked2);
      if (isChecked1) {
        setIsChecked1(!isChecked1);
      }
      if (isChecked3) {
        setIsChecked3(false);
      }
    } else if (checkboxNumber === 3) {
      if (isChecked1 || isChecked2) {
        setIsChecked1(false);
        setIsChecked2(false);
      }
      setIsChecked3(!isChecked3);
    } else if (checkboxNumber === 4) {
      setIsChecked4(!isChecked4);
    }
  }
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(event.target.value);
  }

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
      {(isExec && !execAccess) &&  (
      <div className="flex flex-row justify-center w-9/12 space-x-10"
      style={{ backgroundColor: 'lightgray', padding: '20px' }}>
      <div className = "flex flex-row">
        <div className = "mr-20">
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={() => handleCheckboxChange(1)}
          /> Male
        </div>
        <div className = "mr-20">
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={() => handleCheckboxChange(2)}
          /> Female
        </div>
      </div>
      <div className = "flex flex-row">
        <div className = "mr-20">
          <input
            type="checkbox"
            checked={isChecked3}
            onChange={() => handleCheckboxChange(3)}
          /> Co-ed
        </div>
        <div>
           Floor: 
          <Dropdown
                options={[
                  { label: "Any", value: 0},
                  { label: "Floor 1", value: 1 },
                  { label: "Floor 2", value: 2 },
                  { label: "Floor 3", value: 3 },
                  { label: "Floor 4", value: 4 },
                  { label: "Floor 5", value: 5 },
                  { label: "Floor 6", value: 6 },
                  { label: "Floor 7", value: 7 },
                  { label: "Floor 8", value: 8 },
                ]}
                onSelect={handleDropdownChange}
          />
        </div>
      </div>
    </div>
    )}
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
          <Button
            onClick={clearCurrentMonthSelections}
            className="w-32 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded text-xs"
          >
            Clear
          </Button>
          <Button
            onClick={onSubmit}
            className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
          >
            Submit Schedule
          </Button>
        </div>

        )}
        {/* Conditional message positioned to the right */}
        {!execAccess && !isExec && numDaysNeeded > 0 && (
          <div className="absolute right-0 pr-4">
            <span className="text-red-500 italic">
              Need {numDaysNeeded} more days
            </span>
          </div>
        )}
        
        
      </div>
      
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
    ||
    {isExec && ( 
      <style>{`
      .react-calendar {
        width: 50%; /* Adjust this value to make the calendar wider */
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
