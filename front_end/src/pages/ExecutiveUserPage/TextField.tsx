function TextField({
  label,
  onChange,
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const handleButtonClick = () => {
    console.log("Current input value:", currentValue);
    // Perform any action on button click, e.g., submit the input value
  };
  const currentValue = 10; /* replace this with the actual value from the backend */
  return (
    <div className="flex items-center space-x-2">
      {" "}
      {/* Ensures spacing between items */}
      <label className="whitespace-nowrap">{label}</label>
      <input
        type="text"
        defaultValue={currentValue}
        onChange={onChange}
        className="border-2 border-gray-200 p-2 text-sm flex-grow" // Adjust the flex-grow if needed
      />
      <button
        type="button"
        onClick={handleButtonClick} // Make sure to define this function in your component
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
      >
        Submit
      </button>
    </div>
  );
}
export default TextField;
