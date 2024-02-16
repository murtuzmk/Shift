import java.time.Clock;

public class TimeBlock {

    private long startTime = -1;
    private long endTime = -1;
    private int date = -1;
    private int month = -1;
    private int year = -1;

    public TimeBlock() {}

    public TimeBlock(long startTime, long endTime, int date, int month, int year) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.month = month;
        this.year = year;
    }


    Clock time = Clock.systemUTC();


    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }

    public int getDay() {
        return date;
    }

    public void setDay(int date) {
        this.date = date;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "TimeBlock{" +
                "startTime=" + startTime +
                ", endTime=" + endTime +
                ", date=" + date +
                ", month=" + month +
                ", year=" + year +
                '}';
    }
}