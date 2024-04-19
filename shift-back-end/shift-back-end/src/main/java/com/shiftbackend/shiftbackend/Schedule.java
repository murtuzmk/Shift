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
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        if (!userInformation.exists()) {
            return false;
        }
        try {
            events.clear();
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
                
                if (eventAttributes[3].equals("null")) {
                    tempEvent.setDutyLevel(null);
                }
                else {
                    tempEvent.setDutyLevel(Shift.DutyLevel.valueOf(eventAttributes[3]));
                }
                
                tempEvent.setAvailability(Integer.parseInt(eventAttributes[4]));
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
                    pw.println(event.getId() + "|" + event.getTitle() + "|" + event.getDescription() + "|" + event.getDutyLevel() + "|" + event.getAvailability());
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

    public Shift getEvent(String eventId) {
        for (Shift event : events) {
            if (eventId.equals(event.getId())) {
                return event;
            }
        }
        
        return null;
    }

    public String[] getEvents() {
        ArrayList<Shift> temp = new ArrayList<Shift>();

        for (Shift event : events) {
            if (event.getDutyLevel() == null) {
                temp.add(event);
            }
        }

        return stringArrayShift(temp);
    }

    public int countEvents() {
        int count = 0;

        for (Shift event : events) {
            if (event.getDutyLevel() == null) {
                count++;
            }
        }

        return count;
    }
    public Shift[] eventsArray() {
        Shift[] array = new Shift[countEvents()];
        int i = 0;

        for (Shift event : events) {
            if (event.getDutyLevel() == null) {
                array[i] = event;
                i++;
            }
        }

        return array;
    }

    public String[] getShifts() {
        ArrayList<Shift> temp = new ArrayList<Shift>();

        for (Shift event : events) {
            if (event.getDutyLevel() != null) {
                temp.add(event);
            }
        }

        return stringArrayShift(temp);
    }

    public int countShifts() {
        int count = 0;

        for (Shift event : events) {
            if (event.getDutyLevel() != null) {
                count++;
            }
        }

        return count;
    }

    public Shift[] shiftsArray() {
        Shift[] array = new Shift[countShifts()];
        int i = 0;

        for (Shift event : events) {
            if (event.getDutyLevel() != null) {
                array[i] = event;
                i++;
            }
        }

        return array;
    }

    public String[] stringArrayShift(ArrayList<Shift> temp) { 

        String[] array = new String[temp.size()];
        StringBuilder buffer = new StringBuilder();

        for (int i = 0; i < temp.size(); i++) {
            buffer.append("{\"eventId\": \"" + temp.get(i).getId());
            buffer.append("\",\n");
            buffer.append("\"title\": \"" + temp.get(i).getTitle());
            buffer.append("\",\n");
            buffer.append("\"description\": \"" + temp.get(i).getDescription());
            buffer.append("\",\n");
            
            buffer.append("\"startHour\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"startMinute\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"startMonth\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"startDay\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"startYear\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"startTimezone\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            
            buffer.append("\"endHour\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"endMinute\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"endMonth\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"endDay\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"endYear\": \"" + temp.get(i).getStart().toString());
            buffer.append("\",\n");
            buffer.append("\"endTimezone\": \"" + temp.get(i).getStart().toString());
            buffer.append("\"}");

            array[i] = buffer.toString();
            buffer = new StringBuilder();
        }

        return array;
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