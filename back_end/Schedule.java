import java.util.ArrayList;
import java.util.List;

public class Schedule {

    private List<Shift> events;

    public Schedule () {
        this.events = new ArrayList<>();
    }

    public Schedule(List<Shift> events) {
        this.events = events;
    }

    public List<Shift> getEvents() {
        return events;
    }


    public void setEvents(List<Shift> events) {
        this.events = events;
    }

    public void addEvent(Shift newEvent) {
        events.add(newEvent);
    }

    public void deleteEvent(Shift eventToDelete) {
        events.remove(eventToDelete);
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Schedule{" +
                "events=" + events +
                '}';
    }
}