import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Event 1',
    start: new Date(),
    end: new Date(),
  },
  {
    title: 'Event 2',
    start: new Date(),
    end: new Date(),
  },
];

const MyCalendar = () => {
  return (
    <div className="bg-gray-400 h-100 w-100 flex justify-center items-center text-2xl">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
    </div>
  );
};

export default MyCalendar;