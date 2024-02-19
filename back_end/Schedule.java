public class Schedule {

    /* ------------------------ VARIABLES ------------------------ */

    private Shift[] events = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Schedule () {}

    public Schedule(Shift[] events) {
        this.events = events;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public Shift[] getEvents() {
        return events;
    }

    public void setEvents(Shift[] events) {
        this.events = events;
    }

    /*------------------------ TOSTRING ------------------------*/

    @java.lang.Override
    public java.lang.String toString() {
        return "Schedule{" +
                "events=" + java.util.Arrays.toString(events) +
                '}';
    }
}