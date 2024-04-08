import { useEffect, useState, useMemo} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { v4 as uuidv4 } from "uuid";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import "./MyCalendar.css";


interface MyCalendarProps {
  importedEvents: Event[];
  onEventsChange: (events: Event[]) => void;
}

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
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Event</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, actions) => {
            onSubmit({ start, end, title: values.title, id: uuidv4() });
            actions.resetForm();
          }}
        >
          {(props) => (
            <Form>
              <ModalBody>
                <Field name="title">
                  {({ field }: FieldProps) => (
                    <FormControl>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <Input {...field} id="title" placeholder="Enter title" />
                    </FormControl>
                  )}
                </Field>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                Create
                </Button>
                <Button variant="ghost" onClick={onCancel}>
                  Cancel
                </Button>
                <Button variant="ghost" onClick={onDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

const MyCalendar = ({ importedEvents, onEventsChange  }: MyCalendarProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

/*  useEffect(() => {
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
*/
/*  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []); 
*/

  const fetchEvents = () => {
    fetch("http://localhost:8080/ra/{id}/get-events")
      .then((response) => response.json())
      .then((data) => {
        const s = data.startTime;
        /* s is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const startTime = new Date(s.substring(16).parseInt(), s.substring(13, 15).parseInt(), s.substring(10, 12).parseInt(), s.substring(0, 2).parseInt(), s.substring(3, 5).parseInt());
        
        const e = data.endTime;
        /* e is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const endTime = new Date(e.substring(16).parseInt(), e.substring(13, 15).parseInt(), e.substring(10, 12).parseInt(), e.substring(0, 2).parseInt(), e.substring(3, 5).parseInt());
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            start: startTime,
            end: endTime,
            title: data.title,
            id: data.id,
          },
        ]);
      });
  }; /* fetchEvents */

  const addEvents = (event: Event) => {
      fetch('http://localhost:8080/ra/{id}/add-event/{eventid}', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event.title,
        starthour: event.start.getHours(),
        startminute: event.start.getMinutes(),
        startday: event.start.getDate(),
        startyear: event.start.getFullYear(),
        endhour: event.end.getHours(),
        endminute: event.end.getMinutes(),
        endday: event.end.getDate(),
        endyear: event.end.getFullYear(),
      })
    })  
  };

  /* obtain all saved events of the user */
  useEffect(() => {
    fetchEvents();
  }, []);

/*  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

*/
 const allevents = useMemo(() => {
    console.log("importedEvents", importedEvents);
    return [...importedEvents, ...events];
  } , [importedEvents, events]);  
  /* ask Murtuza idk what this does */
  useEffect(() => {
    onEventsChange(allevents);
  }, [allevents]);


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
    addEvents(event);
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

  const editEvent = (newEvent: Event) => {
    fetch('http://localhost:8080/ra/{id}/edit-event/{eventId}/edit-title', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Edited Title": newEvent.title
      })
    })  
  };
  const handleUpdateEvent = (updatedEvent: Event) => {
    //want to find some way to only call editEvent if the title has been changed
    setEvents((prevEvents) => 
      prevEvents.map((event) =>
        event.start === updatedEvent.start && event.end === updatedEvent.end
          ? (updatedEvent)
          : event
      )
    );
    editEvent(updatedEvent);
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
    <div style={{ width: "800px", height: "450px" }}>
      <Calendar
        localizer={localizer}
        events={allevents}
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
