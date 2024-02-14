public class Scheduler {

    private Schedule[] schedules = null;

    public Scheduler() {}
    public Scheduler(Schedule[] schedules) {
        this.schedules = schedules;
    }

    public Schedule[] getSchedules() {
        return schedules;
    }

    public void setSchedules(Schedule[] schedules) {
        this.schedules = schedules;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Scheduler{" +
                "schedules=" + java.util.Arrays.toString(schedules) +
                '}';
    }
}