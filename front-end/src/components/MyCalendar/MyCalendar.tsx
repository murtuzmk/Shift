import { useEffect, useState, useMemo, MouseEventHandler, useContext, SetStateAction, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Button, Checkbox, CheckboxGroup, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import UserDataContext from "../../context/UserDataContext";
import {Calendar as DatePicker} from "@/components/ui/calendar";
import { Select } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
import "./MyCalendar.css";
import { set } from "react-hook-form";
import { useEventFilter } from "@/context/EventFilterContext";
import { useUser } from "@/hooks/useUser";
import { VerifiedUser } from "@/types";
import { useGetIdentity } from "@refinedev/core";
import { Button as Butt} from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface MyCalendarProps {
  importedEvents: Event[];
  onEventsChange: (events: Event[]) => void;
}
/* Debugging Example */
const exampleEvent: Event = {
  start: new Date(new Date().setHours(9, 0, 0, 0)), // Today at 9:00 AM
  end: new Date(new Date().setHours(17, 0, 0, 0)), // Today at 5:00 PM
  id: uuidv4(),
  title: "Example Event",
  isShift: true,
  isMeeting: false
};
const exampleWorker: employee = {name:"John Doe", id:"003452122"};

/* Added boolean isShift to Event interface, to determine whether an event is a shift or not
 * This will be determined through the two different calls we do to read all events in using
 * get-events and get-shifts. When calling get events i will set the boolean to null so that
 * when editing the event, if its a shift u can select drop
 */
interface Event {
  start: Date;
  end: Date;
  id: string;
  title: string;
  isShift: boolean;
  isMeeting: boolean;
}
interface employee {
  name: string;
  id: string;
}
interface MeetingDialogProps {
  isOpen: boolean;
  onSubmit: (event: Event) => void;
  onClose: () => void;
  workers: employee[];
}
const AssignSorM = ({ isOpen, onSubmit, onClose, workers }: MeetingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date()) 
  const [title, setTitle] = useState<string>("");
  const [isShift, setisShift] = useState(true);
  const handleRChange = (value: string) => {
    if (value === "shift") {
      setisShift(true);
    } else {
      setisShift(false);
    }
  };
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value);
  const isError = title === ''
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Shift or Meeting</ModalHeader>
        <FormControl>
        <FormLabel>Title</FormLabel>
              <Input value={title} onChange={handleInputChange} placeholder='Title' />
              {!isError ? (
                <FormHelperText>
                    Enter the email you'd like to receive the newsletter on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
        </FormControl>
        <DatePicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{
            before: new Date(),
          }}
        ></DatePicker>
        <RadioGroup defaultValue="shift" onChange={handleRChange} value={isShift ? "shift" : "meeting"}>
          <Stack direction="row">
            <Radio value="shift">Shift</Radio>
            <Radio value="meeting">Meeting</Radio>
          </Stack>
          </RadioGroup>
        <Select placeholder="Who is this for?">
          {workers.map((worker, index) => (
          <option key={index} value={worker.name}>
                {worker.name}
              </option>
            ))}
        </Select>
        <Button onClick={() => {
          if (date) {
            onSubmit({start:date, end:date, title:title, id:uuidv4(), isShift: isShift, isMeeting: !isShift});
          }
        }}>
             Create a meeting! </Button>
        </ModalContent>
    </Modal>
  );
};

interface EventDialogProps {
  isOpen: boolean;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  onDelete: () => void;
  start: Date;
  end: Date;
  event: Event | null;
}

const EventDialog = ({
  isOpen,
  onSubmit,
  onCancel,
  onDelete,
  start,
  end,
  event,
}: EventDialogProps) => {
  // State variable for managing the drop request modal
  const [isDropRequestModalOpen, setDropRequestModalOpen] = useState(false);
  const [userResponse, setUserResponse] = useState("");

  const handleDropRequestSubmit = () => {
    setDropRequestModalOpen(false); // Close
    console.log("User Response:", userResponse);
    setUserResponse(""); //Reset field
    // FETCH REQUEST TO BACKEND LATER
  };

  const handleRequestDropClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (event && event.isShift) {
      setDropRequestModalOpen(true); // Open the modal
    } else {
      onDelete();
    }
  };

  return (
    <>
      {/* This Modal Is for when a user is dropping shift and needs to give reasoning */}
      <Modal
        isOpen={isDropRequestModalOpen}
        onClose={() => setDropRequestModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drop Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Select Reason</p>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={4} direction="column">
                <Checkbox value="sick">Sickness</Checkbox>
                <Checkbox value="emergency">Personal Emergency</Checkbox>
                <Checkbox value="leave">Personal Leave</Checkbox>
                <Checkbox value="other">Other</Checkbox>
              </Stack>
            </CheckboxGroup>
            <p>Additional Notes:</p>
            <Input
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your reason here"
              mt={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDropRequestSubmit}>
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDropRequestModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className= "flex justify-center items-center">
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {event?.title ? "Edit Event" : "Create Event"}
          </ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ title: "" }}
            onSubmit={(values, actions) => {
              onSubmit({
                start,
                end,
                title: values.title,
                id: uuidv4(),
                isShift: false,
                isMeeting: false
              });
              actions.resetForm();
            }}>
            {() => (
              <Form>
                <ModalBody>
                  <Field name="title">
                    {({ field }: FieldProps) => (
                      <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                          {...field}
                          id="title"
                          placeholder="Enter title"
                        />
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit">
                    {event && event.isShift ? "Confirm Edit" : "Create"}
                  </Button>
                  <Button variant="ghost" onClick={onCancel}>
                    Cancel
                  </Button>

                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => {
                      e.preventDefault();
                      if (event && event.isShift) {
                        handleRequestDropClick(e); // Pass the event argument to onDropRequest
                      } else {
                        onDelete();
                      }
                    }}>
                    {event && event.isShift ? "Request Drop" : "Delete"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
      </div>
    </>
  );
};

const MyCalendar = ({ importedEvents, onEventsChange }: MyCalendarProps) => {
  const [events, setEvents] = useState<Event[]>([exampleEvent]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchRequest, setSearchRequest] = useState<string>("");
  const { showShifts } = useEventFilter();
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const [userRole, setUserRole] = useState("");
  const id = user && user.sub ? user.sub.split("|")[1] : null;
  const { isOpen: isSorMopen, onOpen: openSorM, onClose: closeSorM } = useDisclosure();
  const { getUserRole }: any = useContext(UserDataContext);
  const [workers, setWorkers] = useState<employee[]>([exampleWorker]);
  const [DisplaySorM, setDisplaySorM] = useState(false);


  const handleCreateMeetingorShift = (meeting: Event) => {
      // send to backend
      if (!meeting.isShift) {
        addEvents(meeting);
      }
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          ...meeting,
        },
      ]);
    }
  const eventStylerGetter = (event: Event) => {
    const backgroundColor = event.isShift ? "orange" : "#007bff";
    return {
      style: {
        backgroundColor,
      },
    };
  };

  /* obtain all saved events of the user */
  useEffect(() => {
    fetchEvents();
    fetchShifts();
  }, []);

  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
    user &&
    (async () => {
      setUserRole(await getUserRole(user?.sub));
    })();
  }, [user, userData]);

  /* Filter events based on the showShifts boolean */
  const filteredEvents = useMemo(() => {
    console.log("Show shifts", showShifts); /* Debugging */
    const allEvents = [...importedEvents, ...events];
    return allEvents.filter (event => {
      
      const isShiftFilter = showShifts ? event.isShift : true;
      if (!searchRequest.trim()) {
        // If the search input is empty, ignore the title filter
        return isShiftFilter;
      }
      const title = event.title.toLowerCase();
      const search = searchRequest.toLowerCase();
      const isSearchFilter = title.includes(search);
      return isShiftFilter && isSearchFilter;
    }
      
    )
    //return showShifts ? allEvents.filter((event) => event.isShift) : allEvents;
  }, [importedEvents, events, showShifts,searchRequest]);

  /*useEffect(() => {
    onEventsChange(
      filteredEvents
    ); /* Update the parent component with the filtered events */
  //}, [filteredEvents, onEventsChange]); */

 /* const memoizedOnEventsChange = useCallback(onEventsChange, []);

  useEffect(() => {
    memoizedOnEventsChange(filteredEvents);
  }, [filteredEvents, memoizedOnEventsChange]); */

  const fetchShifts = () => {
    console.log("Fetching shifts from the backend and id is " + id);
    fetch("http://localhost:8080/ra/" + id + "/get-shifts")
      .then((response) => response.json())
      .then((data) => {
        const s = data.startTime;
        /* s is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const startTime = new Date(
          s.substring(16).parseInt(),
          s.substring(13, 15).parseInt(),
          s.substring(10, 12).parseInt(),
          s.substring(0, 2).parseInt(),
          s.substring(3, 5).parseInt()
        );

        const e = data.endTime;
        /* e is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const endTime = new Date(
          e.substring(16).parseInt(),
          e.substring(13, 15).parseInt(),
          e.substring(10, 12).parseInt(),
          e.substring(0, 2).parseInt(),
          e.substring(3, 5).parseInt()
        );
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            start: startTime,
            end: endTime,
            title: data.title,
            id: data.id,
            isShift: true,
            isMeeting: false
          },
        ]);
      });
  }; /* fetchShifts */

  const fetchEvents = () => {
    console.log("Fetching events from the backend and id is" + id);
    fetch("http://localhost:8080/ra/" + id + "/get-events")
      .then((response) => response.json())
      .then((data) => {
        const s = data.startTime;
        /* s is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const startTime = new Date(
          s.substring(16).parseInt(),
          s.substring(13, 15).parseInt(),
          s.substring(10, 12).parseInt(),
          s.substring(0, 2).parseInt(),
          s.substring(3, 5).parseInt()
        );

        const e = data.endTime;
        /* e is a string in the format "HH:MM TZZ DD/MO/YYYY" */
        const endTime = new Date(
          e.substring(16).parseInt(),
          e.substring(13, 15).parseInt(),
          e.substring(10, 12).parseInt(),
          e.substring(0, 2).parseInt(),
          e.substring(3, 5).parseInt()
        );
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            start: startTime,
            end: endTime,
            title: data.title,
            id: data.id,
            isShift: false,
            isMeeting: false
          },
        ]);
      });
  }; /* fetchEvents */

  const addEvents = (event: Event) => {
    console.log("Adding event to the backend and id is " + event.id);
    console.log(
      "Event is " +
        event.title +
        " " +
        event.start +
        " " +
        event.end +
        " " +
        event.id
    );
    fetch("http://localhost:8080/ra/" + id + "/add-event/{eventid}", {
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
      }),
    });
  };

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedEvent({ start, end, title: "", id: "", isShift: false, isMeeting: false});
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
    fetch("http://localhost:8080/ra/{id}/edit-event/{eventId}/edit-title", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Edited Title": newEvent.title,
      }),
    });
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    //want to find some way to only call editEvent if the title has been changed
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.start === updatedEvent.start && event.end === updatedEvent.end
          ? updatedEvent
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
    <>
    <div style={{ width: "800px", height: "450px" }}>
      <div className="flex justify-end items-center mb-4"> 
        <Input
          placeholder="Search for events"
          type="text"
          value={searchRequest}
          onChange={(e) => setSearchRequest(e.target.value)}
        />
      </div>
     
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        selectable={true}
        eventPropGetter={eventStylerGetter}
      />
      {selectedEvent && (
        <EventDialog
          isOpen={isDialogOpen}
          onSubmit={selectedEvent.title ? handleUpdateEvent : handleCreateEvent}
          onCancel={handleCancel}
          onDelete={handleDeleteEvent}
          start={selectedEvent.start}
          end={selectedEvent.end}
          event={selectedEvent}
          // Update the type of onDropRequest
        />
      )}
    </div>
    <div>
      { userRole !== "Residential Assistant" && 
        <>
          <Button onClick={openSorM}>Open Modal</Button>
          <AssignSorM isOpen={isSorMopen} onSubmit={handleCreateMeetingorShift} onClose={closeSorM} workers={workers}/>
        </>
      }
    </div>
    </>
  );
};
export default MyCalendar;
