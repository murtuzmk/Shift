import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

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

    public boolean loadScheduleFile(String fileName) {
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
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

                tempEvent.setTitle(eventAttributes[0]);
                tempEvent.setDescription(eventAttributes[1]);
                tempEvent.setDutyLevel(Shift.DutyLevel.valueOf(eventAttributes[2]));
                tempEvent.setStart(startTime);
                tempEvent.setEnd(endTime);

                events.add(tempEvent);

            }

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in RA Account Loading");
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public void saveScheduleFile(String fileName) {
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, false));

            if (events != null) {
                for (Shift event : events) {
                    pw.println(event.getTitle() + "|" + event.getDescription() + "|" + event.getDutyLevel());
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

    public boolean deleteAccountFile(String fileName) {
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        return userInformation.delete();
    }

    public void addEvent(Shift newEvent) {
        events.add(newEvent);
    }

    public void deleteEvent(Shift eventToDelete) {

        events.remove(eventToDelete);
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public ArrayList<Shift> getEvents() {
        return events;
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