public class Shift {

    public enum DutyLevel {
        PRIMARY,
        SECONDARY,
        TERTIARY
    }

    private String title = null;
    private String description = null;
    private TimeBlock start = null;
    private TimeBlock end = null;
    private DutyLevel dutyLevel = null;

    public Shift() {}

    public Shift(String title, String description, TimeBlock start, TimeBlock end, DutyLevel dutyLevel) {
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.dutyLevel = dutyLevel;
    }
}