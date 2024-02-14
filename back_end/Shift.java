public class Shift {

    public enum DutyLevel {
        PRIMARY,
        SECONDARY,
        TERTIARY
    }

    private String title = null;
    private String description = null;
    private TimeBlock timestamp = null;
    private DutyLevel dutyLevel = null;

    public Shift () {}
    public Shift(String title, String description, TimeBlock timestamp, DutyLevel dutyLevel) {
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.dutyLevel = dutyLevel;
    }
}