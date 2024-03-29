import { SetStateAction, useEffect, useState } from "react";
import Message from "./ExecutiveUserPage/Message";
import TextField from "./ExecutiveUserPage/TextField";
import Dropdown from "./ExecutiveUserPage/DropDown";
import Notepad from "./ExecutiveUserPage/NotePad";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { Button } from "@chakra-ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import { ViewClockedIn } from "../components/ViewClockedIn";

/*
 *  This is the Executive Page, where the executive can view the RA schedules and assign them to RAs.
 *
 */
function ExecutivePage() {

  const [inputValue, setInputValue] = useState("");
  const [ras, setRas] = useState<string[]>([]); /* Will use this to switch inbetween RA schedules */
  const [currRa, setCurrRa] = useState<string>(""); /* Will use this to switch inbetween RA schedules */
  const { user } = useAuth0();
  const [report, setReport] = useState<string[]>([]); // Placeholder for report]
  const typeOfReports = ["DAILY", "WEEKLY", "MONTHLY"];

  const userid = (user && user.sub ? user.sub.split("|")[1] : null);
  const [currType, setCurrType] = useState<string>("DAILY");
  const [currentValue, setCurrentValue] = useState(() => {
    const saved = localStorage.getItem("currentValue");
    return saved !== null ? saved : "10";
  });  

  const fetchRas = () => {
    fetch('http://localhost:8080/rea/${userid}/get-ras')
    .then((response) => response.json())
    .then((data) => {
      setRas(data);
  });
}

  useEffect(() => {
  // Correctly call fetchRas function
  fetchRas(); // This executes the function
  }, []); 

  /*useEffect(() => {
    // Update localStorage whenever currentValue changes
    localStorage.setItem("currentValue", currentValue);
  }, [currentValue]); This only needs to be stored locally,"*/

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (newValue: any) => {
    window.alert(`You submitted: ${newValue}`);
    setCurrentValue(newValue); // Update the current value with the new input value
    localStorage.setItem("currentValue", newValue);
  };

  /*const dropdownOptions = [
    { label: "RA 1", value: "RA1" }, // Ensure each option has a value property
    { label: "RA 2", value: "RA2" },
    { label: "RA 3", value: "RA3" },
  ];*/

  const raOptions = ras.map((ra, index) => {
    return { key: index, value: ra };
  });
  
  const typeofReportOptions = typeOfReports.map((report, index) => {
    return { label: report, value: index };
  });

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrRa(event.target.value);
    console.log("Selected:", event.target.value);
  };

  /*PostMapping("/{id}/ra/{raId}/add-shift/{eventId}")*/

  const handleREASubmit = (newValue: any) => { // raID is retrievable by getRAs function call
    fetch("http://localhost:8080/rea/${userid}/ra/${currRa}/add-shift/${eventId}")
  }

  /*
   * This function will generate a report for the executive to view.
   * This will download a file containing 
   */

  const generateReport = (newValue: any) => {
    //fetch("http://localhost:8080/rea/${userid}/generate-report")
    console.log("Generating Report");
  }
  const changeTypeOfReport = (newValue: any) => {
    setReport(newValue);
    console.log("Report Type: ", newValue);
  }

  return (
    <>
      <div className="ml-5"> {/* Adjust the ml-* class as needed for desired spacing */}
        <Message />
      </div>

      <div className="flex flex-row items-center">

        <div className="w-1/5 mr-2">
          <div className = "flex flex-col">
            <Notepad/>
            <div className = "flex flex-row items-center justify-start mt-2">
              <Button
                type="button"
                className="w-full h-full bg-blue-500 hover:bg-blue-700 text-white font-medium text-lg px-3 py-5 rounded mr-5"
                onSubmit={generateReport}
                >
                Generate Report
              </Button>
                <Dropdown
                  options={typeofReportOptions}
                  onSelect={changeTypeOfReport} />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center mt-8">
        <label className = "-mt-0"> RA Availability:</label>
        <div className = "mb-2">
        <Dropdown options={raOptions} onSelect={handleDropdownChange} />
        </div>
          <AvailabilityCalendar id={null} accFrmExec={true} />
          <div className="mt-2.5">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-lg px-5 py-2 rounded"
              onSubmit={handleREASubmit}
            >
              Assign {currRa} this Schedule
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute right-5 mr-10 flex flex-row">
        <TextField 
          label="Min Days: "
          onChange={handleInputChange}
          currentValue={currentValue}
          onSubmit={handleSubmit}
        />          
      </div>
       <ViewClockedIn />
      <div className="bottom-0">
      </div>
    </>
  );
}

export default ExecutivePage;
