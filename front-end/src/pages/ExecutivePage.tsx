import { SetStateAction, useEffect, useState } from "react";
import Message from "./ExecutiveUserPage/Message";
import TextField from "./ExecutiveUserPage/TextField";
import Dropdown from "./ExecutiveUserPage/DropDown";
import Notepad from "./ExecutiveUserPage/NotePad";
import AvailabilityCalendar from "../components/AvailabilityCalendar";
import { Button } from "@chakra-ui/button";
import { useAuth0 } from "@auth0/auth0-react";

/*
 *  This is the Executive Page, where the executive can view the RA schedules and assign them to RAs.
 *
 */
function ExecutivePage() {
  const [inputValue, setInputValue] = useState("");
  const [ras, setRas] = useState<string[]>([]); /* Will use this to switch inbetween RA schedules */
  const [currRa, setCurrRa] = useState<string>(""); /* Will use this to switch inbetween RA schedules */
  const { user } = useAuth0();
  const userid = (user && user.sub ? user.sub.split("|")[1] : null);
  const [currentValue, setCurrentValue] = useState(() => {
    const saved = localStorage.getItem("currentValue");
    return saved !== null ? saved : "10";
  });  

  const fetchRas = () => {
    fetch("http://localhost:8080/rea/${userid}/get-ras")
    .then((response) => response.json())
    .then((data) => {
      setRas(data);
  });
}

  useEffect(() => { fetchRas}, []);

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

  const dropdownOptions = [
    { label: "RA 1", value: "RA1" }, // Ensure each option has a value property
    { label: "RA 2", value: "RA2" },
    { label: "RA 3", value: "RA3" },
  ];


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

  return (
    <>
      <div className="">
        <Message />
      </div>
      
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div>
      <AvailabilityCalendar id={null} execAccess={true} />
      </div>
    <div style={{ marginTop: '10px' }}>
      <Button
        type="button"
        colorScheme="blue"
        style={{ fontSize: '1rem', padding: '8px 20px' }}
        onSubmit={handleREASubmit}
      >
        Assign {currRa} this Schedule
      </Button>
    </div>
  </div>

      <div className= "absolute right-20">
      <TextField
          label="Min Days: "
          onChange={handleInputChange}
          currentValue={currentValue} // Convert currentValue to a string
          onSubmit={handleSubmit}
        />
        <label className="mr-2">Your RAs:</label>
        <Dropdown options={dropdownOptions} onSelect={handleDropdownChange} />
      </div>
      <div className = "bottom">
      </div>
      

      
    </>
  );
}

export default ExecutivePage;
function setCurrentValue(newValue: any) {
  throw new Error("Function not implemented.");
}
