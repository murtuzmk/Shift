import { useContext, useEffect, useState } from "react";
import MyCalendar from "../../components/MyCalendar/MyCalendar";
import UserDataContext from "../../context/UserDataContext";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import * as ICAL from "ical.js";
import { ModeToggle } from "@/components/mode-toggle";
import jsPDF from "jspdf";
import ToggleSwitch from "@/components/ToggleSwitch";
import { ClassNames } from "@emotion/react";
import { EventFilterProvider } from "@/context/EventFilterContext";
import { useOnboardContext } from "@/context/justOnboarded";
import { OnboardConfirmation } from "./onboard-confirmation";
import { useGetIdentity } from "@refinedev/core";
import { VerifiedUser } from "@/types";
interface Event {
  start: Date;
  end: Date;
  title: string;
  id: string;
  isShift: boolean;
}

export const Dashboard = () => {
  const { justOnboarded, setJustOnboarded } = useOnboardContext();
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const { getUserRole }: any = useContext(UserDataContext);
  const [userRole, setUserRole] = useState("Loading...");
  const [importedEvents, setImportedEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const { theme } = useTheme();

  /* Booleans for toggles - Based off these we will change view of availability calendar*/
  const [shiftsOnly, setShiftsOnly] = useState(false);
  const [conflicting, setConflicting] = useState(false);
  const [shifts, setShifts] = useState<Event[]>([]); // Shifts only part when it is toggled

  const handleExport = () => {
    // Create a new calendar
    const calendar = new ICAL.Component(["vcalendar", [], []]);

    // Add each event to the calendar
    events.forEach((event: Event) => {
      const vevent = new ICAL.Component("vevent");
      const icalEvent = new ICAL.Event(vevent);

      // Set the event details
      icalEvent.startDate = ICAL.Time.fromJSDate(event.start);
      icalEvent.endDate = ICAL.Time.fromJSDate(event.end);
      icalEvent.summary = event.title;
      icalEvent.uid = event.id; // You may need to generate unique IDs if not available

      // Add the event to the calendar
      calendar.addSubcomponent(vevent);
    });

    // Generate the .ics file content
    const icsData = calendar.toString();

    // Create a Blob with the .ics file content
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8;" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "calendar.ics");

    // Append the link to the body
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result;
        if (contents) {
          const jcalData = ICAL.parse(contents.toString());
          const comp = new ICAL.Component(jcalData);

          // Extract data from the .ics file and adding it to the importedEvents state
          const events = comp
            .getAllSubcomponents("vevent")
            .map((event: ICAL.Component) => {
              const icalEvent = new ICAL.Event(event);
              return {
                start: icalEvent.startDate.toJSDate(),
                end: icalEvent.endDate.toJSDate(),
                title: icalEvent.summary,
                id: icalEvent.uid, // Assuming UID is available in .ics file
              };
            });

          // Update imported events state
          setImportedEvents(events);
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
    user &&
      (async () => {
        setUserRole(await getUserRole(user?.sub));
      })();
  }, [user, userData]);

  const handleDownload = () => {
    // Create a PDF document
    const doc = new jsPDF();

    // Set the document properties
    doc.setProperties({
      title: "My Schedule",
    });

    // Add content to the document
    doc.text("My Schedule", 10, 10);
    doc.text(`User: ${user?.name}`, 10, 20);
    doc.text(`Role: ${userRole}`, 10, 30);
    doc.text("Shifts:", 10, 40);

    // Add each shift to the document
    events.forEach((event, index) => {
      const startY = 50 + index * 10;
      doc.text(
        `${event.start.toLocaleString()} - ${event.end.toLocaleString()}`,
        10,
        startY
      );
      doc.text(`Title: ${event.title}`, 10, startY + 10);
      doc.text(`ID: ${event.id}`, 10, startY + 20);
    });

    // Save the document as a PDF file
    doc.save("schedule.pdf");
  };

  return (
    <div className="bg-background text-black dark:text-white flex-1 p-4 flex flex-col gap-4">
      <OnboardConfirmation
        open={justOnboarded}
        onOpenChange={setJustOnboarded}
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}! 👋</h1>
        <p className="text-base">Role: {userRole}</p>
        <p className="text-base">Welcome back, track your shifts here!</p>
      </div>
      <div className="flex-1 rounded-lg grid grid-cols-8 grid-rows-6 gap-4 fill-primary">
        <EventFilterProvider>
          <div className="bg-background text-black dark:text-white rounded-lg border-dashed border-2 border-gray-300 col-span-6 row-span-4 p-6 flex flex-col gap-3">
            <h1 className="text-xl font-extrabold">General Information</h1>
            <MyCalendar
              importedEvents={importedEvents}
              onEventsChange={setEvents}
            />
            <div className="flex gap-2">
              <button
                className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDownload}>
                Download
              </button>
              <button
                className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => document.getElementById("fileInput")?.click()}>
                Import
              </button>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept=".ics"
                onChange={handleFileImport}
              />
              <button
                className="bg-teal-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleExport}>
                Export
              </button>
              <ModeToggle />
              <div
                style={{ transform: "scale(0.75)" }}
                className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold"> Show Shifts Only</h3>
                <ToggleSwitch id="shiftToggle" toggleType="shifts" />
              </div>
              <div
                style={{ transform: "scale(0.75)" }}
                className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold"> Show Conflicting</h3>
                <ToggleSwitch id="conflictToggle" toggleType="conflicts" />
              </div>
            </div>
          </div>
        </EventFilterProvider>
      </div>
    </div>
  );
};
