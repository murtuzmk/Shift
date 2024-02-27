import java.util.ArrayList;
import java.util.List;

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