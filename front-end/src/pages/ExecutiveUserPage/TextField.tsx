import { useState, useEffect, ChangeEvent } from "react";

interface TextFieldProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string; // Assuming currentValue is meant to be a string
  onSubmit: (value: string) => void;
}

function TextField({
  label,
  onChange,
  currentValue,
  onSubmit,
}: TextFieldProps) {
  const [localValue, setLocalValue] = useState(currentValue); // Use local state to handle input changes

  useEffect(() => {
    setLocalValue(currentValue); // Update localValue when currentValue changes
  }, [currentValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
    onChange(event); // Call the passed onChange function to lift state up if needed
  };

  const handleButtonClick = () => {
    onSubmit(localValue); // Pass the current input value back to the parent component
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="whitespace-nowrap">{label}</label>
      <input
        type="text"
        value={localValue}
        onChange={handleInputChange}
        className="border-2 border-gray-200 p-2 text-sm flex-grow"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
      >
        Submit
      </button>
    </div>
  );
}

export default TextField;
