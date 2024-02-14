public class Schedule {

    private Shift[] events = null;

    public Schedule () {}

    public Schedule(Shift[] events) {
        this.events = events;
    }

    public Shift[] getEvents() {
        return events;
    }

    public void setEvents(Shift[] events) {
        this.events = events;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Schedule{" +
                "events=" + java.util.Arrays.toString(events) +
                '}';
    }
}