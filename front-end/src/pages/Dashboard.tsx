import { useContext, useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar/MyCalendar";
import { useUser } from "../hooks/useUser";
import UserDataContext from "../context/UserDataContext";
import * as ICAL from 'ical.js';

const handleExport = () => {
  // Create a new calendar
  const calendar = new ICAL.Component(['vcalendar', [], []]);

  // Add each event to the calendar
  
};

const Dashboard = () => {
  const { user } = useUser();
  const { getUserRole }: any = useContext(UserDataContext);
  const [userRole, setUserRole] = useState("Loading...");
  const [importedEvents, setImportedEvents] = useState<Event[]>([]);

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
          const events = comp.getAllSubcomponents('vevent').map((event: ICAL.Component) => {
            const icalEvent = new ICAL.Event(event);
            return {
              start: icalEvent.startDate.toJSDate(),
              end: icalEvent.endDate.toJSDate(),
              title: icalEvent.summary,
              id: icalEvent.uid // Assuming UID is available in .ics file
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
    user &&
      (async () => {
        setUserRole(await getUserRole(user?.sub));
      })();
  }, [user]);
  return (
    <div className="bg-gray-100 flex-1 p-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}! 👋</h1>
        <p className="text-base">Role: {userRole}</p>
        <p className="text-base">Welcome back, track your shifts here!</p>
      </div>
      <div className="flex-1 rounded-lg grid grid-cols-8 grid-rows-6 gap-4">
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 1
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 2
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 3
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 4
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-5 row-span-4 p-6 flex flex-col gap-3">
          <h1 className="text-xl font-extrabold">General Information</h1>
          <MyCalendar importedEvents={importedEvents} />
          <div className="flex gap-2">
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => document.getElementById('fileInput')?.click()}
          >
              Import
            </button>
            <input 
            type="file" 
            id="fileInput" 
            style={{ display: 'none' }} 
            accept=".ics"
            onChange={handleFileImport}
            />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-3 row-span-3">
          Co-workers
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
