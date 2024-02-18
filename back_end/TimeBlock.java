import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Clock;
import java.util.Date;

public class TimeBlock {
    private int hour = -1;
    private int minute = -1;
    private int day = -1;
    private int month = -1;
    private int year = -1;
    private int timezone = 0;
    private long secondsEpoch = -1;
    public TimeBlock() {}

    public TimeBlock(int hour, int minute, int month, int day, int year, int timezone) {
        this.hour = hour;
        this.minute = minute;
        this.day = day;
        this.month = month;
        this.year = year;
        this.timezone = timezone;

        /* Represent time as seconds since Java epoch in UTC ( 1970 January 01 00:00:00 UTC ) */
        String objDate = this.toString();
        SimpleDateFormat formattedDate = new SimpleDateFormat("HH:mm X MM/dd/yyyy");
        Date date = null;
        try {
            date = formattedDate.parse(objDate);
        } catch (ParseException e) {
            System.out.println("Problem with date parsing");
            throw new RuntimeException(e);
        }
        secondsEpoch = date.getTime();
    }

    public boolean isExpired(int days, int hours, int minutes) {
        long seconds = (Clock.systemDefaultZone().millis() - secondsEpoch) / 1000;
        return (seconds >= (86400L * days) + (3600L * hours) + (60L * minutes));
    }

    public int getHour() {
        return hour;
    }

    public int getMinute() {
        return minute;
    }

    public int getDay() {
        return day;
    }

    public int getMonth() {
        return month;
    }

    public int getYear() {
        return year;
    }

    public int getTimezone() {
        return timezone;
    }

    public void setTimezone(int timezone) {
        this.timezone = timezone;
    }

    @Override
    public String toString() {
        if (timezone < 0) {
            return String.format("%02d:%02d %03d %02d/%02d/%04d", hour, minute, timezone, month, day, year);
        }
        else {
            return String.format("%02d:%02d %s%02d %02d/%02d/%04d", hour, minute, '+', timezone, month, day, year);
        }
    }
}