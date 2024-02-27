import React, { useState } from "react";

const Notepad = () => {
  const [text, setText] = useState("");
  const [isEditable, setIsEditable] = useState(true);

  const handleSave = () => {
    // Save the text here. This could involve sending it to a server,
    // saving it to local storage, etc.
    console.log(text);
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">My Notepad</h1> {/* This is the title */}
      <textarea
        className="border p-2 mb-2 w-96 h-60" // Adjust the width (w-96) and height (h-60) as needed
        value={text}
        onChange={(e) => setText(e.target.value)}
        readOnly={!isEditable}
      />
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSave}
          disabled={!isEditable}
        >
          Save
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Notepad;
