import { SetStateAction, useEffect, useState } from "react";
import Message from "./ExecutiveUserPage/Message";
import TextField from "./ExecutiveUserPage/TextField";
import Dropdown from "./ExecutiveUserPage/DropDown";
import Notepad from "./ExecutiveUserPage/NotePad";

function ExecutivePage() {
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState(() => {
    const saved = localStorage.getItem("currentValue");
    return saved !== null ? saved : "10";
  });


  useEffect(() => {
    // Update localStorage whenever currentValue changes
    localStorage.setItem("currentValue", currentValue);
  }, [currentValue]); /* This only needs to be stored locally,"*/

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = (newValue: any) => {
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
    console.log("Selected:", event.target.value);
  };

  return (
    <>
      <div className="">
        <Message />
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
      
    </>
  );
}

export default ExecutivePage;
function setCurrentValue(newValue: any) {
  throw new Error("Function not implemented.");
}
