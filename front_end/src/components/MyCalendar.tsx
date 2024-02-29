import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./MyCalendar.css";
import EventDialog from "./EventDialog";

const localizer = momentLocalizer(moment);

interface Event {
  start: Date;
  end: Date;
  id: string;
  title: string;
}

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      const parsedEvents: Event[] = JSON.parse(savedEvents);
      const eventsWithDates: Event[] = parsedEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setEvents(eventsWithDates);
    }
  }, []);

  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedEvent({ start, end, title: "", id: "" });
    setDialogOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "z" && selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEvent, events]);

  const handleCreateEvent = (event: Event) => {
    setEvents((prevEvents) => [
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
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setSelectedEvent(null);
      setDialogOpen(false);
    }
  };

  return (
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
