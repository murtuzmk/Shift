public class TimeBlock {

    public enum Day {
        MONDAY,
        TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY,
        SATURDAY,
        SUNDAY
    }

    public enum Month {
        JANUARY,
        FEBRUARY,
        MARCH,
        APRIL,
        MAY,
        JUNE,
        JULY,
        AUGUST,
        SEPTEMBER,
        OCTOBER,
        NOVEMBER,
        DECEMBER
    }

    private long startTime = null;
    private long endTime = null;
    private Day day = null;
    private Month month = null;
    private int year = null;

    public TimeBlock() {}

    public TimeBlock(long startTime, long endTime, Day day, Month month, int year) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.day = day;
        this.month = month;
        this.year = year;
    }
}