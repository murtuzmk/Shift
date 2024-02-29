public class Scheduler {

    /* ------------------------ VARIABLES ------------------------ */

    private Schedule[] schedules = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Scheduler() {}
    public Scheduler(Schedule[] schedules) {
        this.schedules = schedules;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public Schedule[] getSchedules() {
        return schedules;
    }

    public void setSchedules(Schedule[] schedules) {
        this.schedules = schedules;
    }

    /*------------------------ TOSTRING ------------------------*/

    @java.lang.Override
    public java.lang.String toString() {
        return "Scheduler{" +
                "schedules=" + java.util.Arrays.toString(schedules) +
                '}';
    }
}