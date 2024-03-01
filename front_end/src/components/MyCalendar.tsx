<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';
import 'react-big-calendar/lib/css/react-big-calendar.css';
=======
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";
import EventDialog from "./EventDialog";

>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
const localizer = momentLocalizer(moment);
import './calendar.css';
interface Event {
  start: Date;
  end: Date;
  id: string;
  title: string;
}

<<<<<<< HEAD
interface EventDialogProps {
  isOpen: boolean;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  onDelete: () => void;
  start: Date;
  end: Date;
}

const EventDialog = ({ isOpen, onSubmit, onCancel, onDelete, start, end }: EventDialogProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ start, end, title, id: uuidv4()});
  };

  return (
    <Modal isOpen={isOpen} style = {{content: {
      width: '500px',
      height: '400px',
      margin: 'auto',
    },}}>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <button style={{margin: '5px'}} onClick={onCancel}>Cancel</button>
        <button style={{margin: '5px'}} type="submit">Create </button>
        <button style={{margin: '5px'}} type="button" onClick={onDelete}>Delete </button>
      </form>
    </Modal>
  );
};

=======
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
<<<<<<< HEAD
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      const parsedEvents: Event[] = JSON.parse(savedEvents);
      const eventsWithDates: Event[] = parsedEvents.map(event => ({
=======
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents: Event[] = JSON.parse(savedEvents);
      const eventsWithDates: Event[] = parsedEvents.map((event) => ({
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(eventsWithDates);
    }
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    const savedEvents = localStorage.getItem('events');
=======
    const savedEvents = localStorage.getItem("events");
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  

  const handleSelect = ({ start, end}: { start: Date, end: Date }) => {
    setSelectedEvent({ start, end, title: '', id: ''});
=======
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedEvent({ start, end, title: "", id: "" });
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
    setDialogOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
<<<<<<< HEAD
    if (e.ctrlKey && e.key === 'z' && selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
=======
    if (e.ctrlKey && e.key === "z" && selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
      setSelectedEvent(null);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
=======
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
    };
  }, [selectedEvent, events]);

  const handleCreateEvent = (event: Event) => {
<<<<<<< HEAD
    setEvents(prevEvents => [
=======
    setEvents((prevEvents) => [
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
      ...prevEvents,
      {
        ...event, // Generate a new ID for the event
      },
    ]);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.start === updatedEvent.start && event.end === updatedEvent.end
          ? updatedEvent
          : event
      )
    );
    setDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
<<<<<<< HEAD
      setEvents(events.filter(event => event.id !== selectedEvent.id));
=======
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
      setSelectedEvent(null);
      setDialogOpen(false);
    }
  };

  return (
<<<<<<< HEAD
    <div style = {{ width: '800px', height: '450px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        selectable = {true}
      />
      {selectedEvent && (
        <EventDialog
          isOpen={isDialogOpen}
          onSubmit={selectedEvent.title ? handleUpdateEvent : handleCreateEvent}
          onCancel={handleCancel}
          onDelete={handleDeleteEvent} 
          start={selectedEvent.start}
          end={selectedEvent.end}
=======
    <>
      <h1 className="text-xl font-extrabold">General Information</h1>
      <div className=" h-5/6">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          onSelectSlot={handleSelect}
          onSelectEvent={handleSelectEvent}
          selectable={true}
>>>>>>> 9e19a647f38d6a20454356d7294cefdc784832b8
        />
        {selectedEvent && (
          <EventDialog
            isOpen={isDialogOpen}
            onSubmit={
              selectedEvent.title ? handleUpdateEvent : handleCreateEvent
            }
            onCancel={handleCancel}
            onDelete={handleDeleteEvent}
            start={selectedEvent.start}
            end={selectedEvent.end}
          />
        )}
      </div>
    </>
  );
};

export default MyCalendar;
