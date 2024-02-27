public class Shift {

    /* ------------------------ ENUMS ------------------------ */

    public enum DutyLevel {
        PRIMARY,
        SECONDARY,
        TERTIARY
    }

    /* ------------------------ VARIABLES ------------------------ */

    private String title = null;
    private String description = null;
    private TimeBlock start = null;
    private TimeBlock end = null;
    private DutyLevel dutyLevel = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Shift() {}

    public Shift(String title, String description, TimeBlock start, TimeBlock end, DutyLevel dutyLevel) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.dutyLevel = dutyLevel;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TimeBlock getStart() {
        return start;
    }

    public void setStart(TimeBlock start) {
        this.start = start;
    }

    public TimeBlock getEnd() {
        return end;
    }

    public void setEnd(TimeBlock end) {
        this.end = end;
    }

    public DutyLevel getDutyLevel() {
        return dutyLevel;
    }

    public void setDutyLevel(DutyLevel dutyLevel) {
        this.dutyLevel = dutyLevel;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return "Shift{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", start=" + start +
                ", end=" + end +
                ", dutyLevel=" + dutyLevel +
                '}';
    }
}