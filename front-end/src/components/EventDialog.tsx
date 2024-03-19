import { useState } from "react";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
interface Event {
  start: Date;
  end: Date;
  id: string;
  title: string;
}

interface EventDialogProps {
  isOpen: boolean;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  onDelete: () => void;
  start: Date;
  end: Date;
}

const EventDialog = ({
  isOpen,
  onSubmit,
  onCancel,
  onDelete,
  start,
  end,
}: EventDialogProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ start, end, title, id: uuidv4() });
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: "500px",
          height: "400px",
          margin: "auto",
          zIndex: 50,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button style={{ margin: "5px" }} onClick={onCancel}>
          Cancel
        </button>
        <button style={{ margin: "5px" }} type="submit">
          Create{" "}
        </button>
        <button style={{ margin: "5px" }} type="button" onClick={onDelete}>
          Delete{" "}
        </button>
      </form>
    </Modal>
  );
};

export default EventDialog;
