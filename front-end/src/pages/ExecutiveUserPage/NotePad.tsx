import React, { useEffect, useState } from "react";

const Notepad = () => {
  //const [text, setText] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [rules, setRules] = useState(""); // Placeholder for rules]

  const handleSave = () => {
    // Save the text here. This could involve sending it to a server,
    // saving it to local storage, etc.
    console.log(rules);
    localStorage.setItem("rules", JSON.stringify(rules));
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };
  
  useEffect(() => {
    const loadedRules = localStorage.getItem("rules");
    if (loadedRules) {
      try {
        setRules(JSON.parse(loadedRules));
      } catch (e) {
        console.error(e);
        localStorage.removeItem("rules");
        setRules("");
      }
    } 
  }, []);

  /* EXAMPLE OF ACCESSING OUTPUT FROM URL
  useEffect(()=>{
    (async ()=>{
      const data = await fetch("http://localhost:8080/ra/123")
      const response = await data.json()
      console.log(response)
    })()
  },[])
  */
 
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Rules</h1> {/* This is the title */}
      <textarea
        className="border p-2 mb-2 w-96 h-60" // Adjust the width (w-96) and height (h-60) as needed
        value={rules}
        onChange={(e) => setRules(e.target.value)}
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
