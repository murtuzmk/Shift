package com.shiftbackend.shiftbackend;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

import com.shiftbackend.shiftbackend.Shift.DutyLevel;

public class Schedule {

    /* ------------------------ VARIABLES ------------------------ */
    private ArrayList<Shift> events;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Schedule () {
        this.events = new ArrayList<>();
    }

    public Schedule(ArrayList<Shift> events) {
        this.events = events;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    public boolean loadScheduleFile(String id) {
        String fileName = "Schedule_" + id +  ".txt";
        File userInformation = new File(System.getProperty("user.dir"), fileName);
        if (!userInformation.exists()) {
            return false;
        }
        try {
            Scanner reader = new Scanner(userInformation);

            while (reader.hasNextLine()) {
                String eventInformation = reader.nextLine();
                String startingTime = reader.nextLine();
                String endingTime = reader.nextLine();

                String[] eventAttributes = eventInformation.split("[|]");
                String[] start = startingTime.split("[|]");
                String[] end = endingTime.split("[|]");

                // Events

                Shift tempEvent = new Shift();
                TimeBlock startTime = new TimeBlock(Integer.parseInt(start[0]), Integer.parseInt(start[1]), Integer.parseInt(start[4]), Integer.parseInt(start[3]), Integer.parseInt(start[5]), Integer.parseInt(start[2]));
                TimeBlock endTime = new TimeBlock(Integer.parseInt(end[0]), Integer.parseInt(end[1]), Integer.parseInt(end[4]), Integer.parseInt(end[3]), Integer.parseInt(end[5]), Integer.parseInt(end[2]));

                tempEvent.setId(eventAttributes[0]);
                tempEvent.setTitle(eventAttributes[1]);
                tempEvent.setDescription(eventAttributes[2]);
                tempEvent.setDutyLevel(Shift.DutyLevel.valueOf(eventAttributes[3]));
                tempEvent.setStart(startTime);
                tempEvent.setEnd(endTime);

                events.add(tempEvent);

            }

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in Schedule Loading");
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public void saveScheduleFile(String id) {
        String fileName = "Schedule_" + id +  ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, false));

            if (events != null) {
                for (Shift event : events) {
                    pw.println(event.getId() + "|" + event.getTitle() + "|" + event.getDescription() + "|" + event.getDutyLevel());
                    pw.println(event.getStart().storageString());
                    pw.println(event.getEnd().storageString());
                }
            }
            else {
                pw.println("null");
            }


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in Schedule Saving");
            e.printStackTrace();
        }
    }

    public boolean deleteAccountFile(String id) {
        String fileName = "Schedule_" + id +  ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        return userInformation.delete();
    }

    public void addEvent(Shift newEvent) {
        events.add(newEvent);
    }

    public void editEventTitle(String eventId, String title) {
        for (Shift event : events) {
            if (eventId.equals(event.getId())) {
                event.setTitle(title);
            }
        }
    }

    public void editEventDescription(String eventId, String description) {
        for (Shift event : events) {
            if (eventId.equals(event.getId())) {
                event.setDescription(description);
            }
        }
    }

    public void editEventDutyLevel(String eventId, String dutyLevel) {
        for (Shift event : events) {
            if (eventId.equals(event.getId())) {
                event.setDutyLevel(DutyLevel.valueOf(dutyLevel));
            }
        }
    }

    public void deleteEvent(String eventId) {
        for (int i = 0; i < events.size(); i++) {
            if (eventId.equals(events.get(i).getId())) {
                if (events.get(i).getDutyLevel() == null) {
                    events.remove(i);
                }
            }
        }
    }

    public void deleteShift(String ShiftId) {
        for (int i = 0; i < events.size(); i++) {
            if (ShiftId.equals(events.get(i).getId())) {
                if (events.get(i).getDutyLevel() != null) {
                    events.remove(i);
                }
            }
        }
    }

    /*
    public void deleteEventHour(int hour, int timezone) {
        for (int i = 0; i < events.size(); i++) {
            if (hour == events.get(i).getStart().getHour() && (timezone == events.get(i).getStart().getTimezone())) {
                if (events.get(i).getDutyLevel() == null) {
                    events.remove(i);
                }
            }
        }
    }
    */

    public void deleteEventDay(int day, int month, int timezone) {
        for (int i = 0; i < events.size(); i++) {
            if ((day == events.get(i).getStart().getDay()) && (month == events.get(i).getStart().getMonth()) && (timezone == events.get(i).getStart().getTimezone())) {
                if (events.get(i).getDutyLevel() == null) {
                    events.remove(i);
                }
            }
        }
    }

    public void deleteEventWeek(int day, int month, int year, int timezone) {
        TimeBlock weekStart = new TimeBlock(0, 0, month, day, year, timezone);
        long weekEndSeconds = weekStart.getSecondsEpoch() + 604800;

        for (int i = 0; i < events.size(); i++) {
            if (weekEndSeconds > events.get(i).getStart().getSecondsEpoch()) {
                if (events.get(i).getDutyLevel() == null) {
                    events.remove(i);
                }
            }
        }
    }

    public void deleteEventMonth(int month, int year, int timezone) {
        for (int i = 0; i < events.size(); i++) {
            if ((month == events.get(i).getStart().getMonth()) && (year == events.get(i).getStart().getYear()) && (timezone == events.get(i).getStart().getTimezone())) {
                if (events.get(i).getDutyLevel() == null) {
                    events.remove(i);
                }
            }
        }
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getEvents() {
        StringBuilder buffer = new StringBuilder();

        for (Shift event : events) {
            if (event.getDutyLevel() == null) {
                buffer.append("{\"eventId\": \"" + event.getId());
                buffer.append("\"\n");
                buffer.append("\"title\": \"" + event.getTitle());
                buffer.append("\"\n");
                buffer.append("\"description\": \"" + event.getDescription());
                buffer.append("\"\n");
                
                buffer.append("\"startHour\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startMinute\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startMonth\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startDay\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startYear\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startTimezone\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                
                buffer.append("\"endHour\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endMinute\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endMonth\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endDay\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endYear\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endTimezone\": \"" + event.getStart().toString());
                buffer.append("\"\n");
            }
        }

        return buffer.toString();
    }

    public String getShifts() {
        StringBuilder buffer = new StringBuilder();

        for (Shift event : events) {
            if (event.getDutyLevel() != null) {
                buffer.append("{\"shifttId\": \"" + event.getId());
                buffer.append("\"\n");
                buffer.append("\"title\": \"" + event.getTitle());
                buffer.append("\"\n");
                buffer.append("\"description\": \"" + event.getDescription());
                buffer.append("\"\n");
                buffer.append("\"dutyLevel\": \"" + event.getDutyLevel());
                buffer.append("\"\n");

                buffer.append("\"startHour\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startMinute\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startMonth\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startDay\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startYear\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"startTimezone\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                
                buffer.append("\"endHour\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endMinute\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endMonth\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endDay\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endYear\": \"" + event.getStart().toString());
                buffer.append("\"\n");
                buffer.append("\"endTimezone\": \"" + event.getStart().toString());
                buffer.append("\"\n");
            }
        }

        return buffer.toString();
    }


    public void setEvents(ArrayList<Shift> events) {
        this.events = events;
    }

    /*------------------------ TOSTRING ------------------------*/

    @java.lang.Override
    public java.lang.String toString() {
        return "Schedule{" +
                "events=" + events +
                '}';
    }
}