import React, { useState } from "react";
import "./style/NotePad.css";
function Notepad() {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  const handleNoteChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNote(event.target.value);
  };

  const saveNote = () => {
    setSavedNote(note);
  };

  return (
    <div className="notepad">
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Type your note here..."
        className="textarea"
      />
      <button onClick={saveNote} className="save-btn">
        Save Note
      </button>
      <div className="saved-note">{savedNote}</div>
    </div>
  );
}

export default Notepad;
