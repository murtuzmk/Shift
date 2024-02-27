import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

interface Event {
  start: Date;
  end: Date;
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

const EventDialog = ({ isOpen, onSubmit, onCancel, onDelete, start, end }: EventDialogProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ start, end, title });
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
        <button onClick={onCancel}>Cancel</button>
        <button type="submit">Create Event</button>
        <button type="button" onClick={onDelete}>Delete Event</button>
      </form>
    </Modal>
  );
};

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelect = ({ start, end }: { start: Date, end: Date }) => {
    setSelectedEvent({ start, end, title: '' });
    setDialogOpen(true);
  };

  const handleCreateEvent = (event: Event) => {
    setEvents(prevEvents => [...prevEvents, event]);
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
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.start === updatedEvent.start && event.end === updatedEvent.end
          ? updatedEvent
          : event
      )
    );
    setDialogOpen(false);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(prevEvents => prevEvents.filter(event => event !== selectedEvent));
      setDialogOpen(false);
    }
  };

  return (
    <div style = {{ width: '800px', height: '400px' }}>
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
        />
      )}
    </div>
  );
};

export default MyCalendar;