import { SetStateAction, useState } from "react";
import Message from "./ExecutiveUserPage/Message";
import TextField from "./ExecutiveUserPage/TextField";
import Dropdown from "./ExecutiveUserPage/DropDown";
import Notepad from "./ExecutiveUserPage/NotePad";
function ExecutivePage() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = () => {
    console.log("Current input value:", inputValue);
    // Perform any action on button click, e.g., submit the input value
  };
  const dropdownOptions = [
    { label: "RA 1" },
    { label: "RA 2" },
    { label: "RA 3" },
  ];

  const handleDropdownChange = (option: { label: any }) => {
    console.log("Selected:", option.label);
    // Perform actions based on the selected option
  };
  return (
    <div className="mt-4">
      <Message />
      <div className="flex flex-col space-y-2">
        {" "}
        {/* flex-col- vertical alignment , space-y-2 for spacing */}
        <div className="flex items-center space-x-2">
          {" "}
          {/* This div for horizontal alignment of text field and button */}
          <TextField label="Min Hours: " onChange={handleInputChange} />
          <button
            onClick={handleButtonClick}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded" // Updated classes for grey button
          >
            Submit
          </button>
        </div>
        <Dropdown options={dropdownOptions} onSelect={handleDropdownChange} />{" "}
        {/* Dropdown aligned with the above elements */}
      </div>
      {/* Note pad implement here*/}
    </div>
  );
}
export default ExecutivePage;
