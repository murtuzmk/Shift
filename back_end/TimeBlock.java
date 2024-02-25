import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Clock;
import java.util.Date;

public class TimeBlock {

    /* ------------------------ VARIABLES ------------------------ */
  
    private int hour = -1;
    private int minute = -1;
    private int day = -1;
    private int month = -1;
    private int year = -1;

    /* Keeps track of hours away from UTC as an integer */
    private int timezone = 0;

    /* Represent TimeBlock as milliseconds since epoch in UTC ( 1970 January 01 00:00:00 UTC ) */
    private long secondsEpoch = -1;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public TimeBlock() {}

    public TimeBlock(int hour, int minute, int month, int day, int year, int timezone) {
        this.hour = hour;
        this.minute = minute;
        this.day = day;
        this.month = month;
        this.year = year;
        this.timezone = timezone;

        /* Convert time to milliseconds since epoch */
        String objDate = this.toString();
        SimpleDateFormat formattedDate = new SimpleDateFormat("HH:mm X MM/dd/yyyy");
        Date date = null;
        try {
            date = formattedDate.parse(objDate);
        } catch (ParseException e) {
            System.out.println("Problem with date parsing");
            throw new RuntimeException(e);
        }
        secondsEpoch = date.getTime() / 1000;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*
     * Calculates whether a TimeBlock is past a certain expiration
     * period, i.e. the TimeBlock is a certain number of days, hours,
     * or minutes older than the current time.
     *
     * @param days: number of days until this TimeBlock expires
     * @param hours: number of hours until this TimeBlock expires
     * @param minutes: number of minutes until this TimeBlock expires
     * @return boolean: is the TimeBlock older than inputted range
     */
    public boolean isExpired(int days, int hours, int minutes) {
        long seconds = (Clock.systemDefaultZone().millis() / 1000) - secondsEpoch;
        return (seconds >= (86400L * days) + (3600L * hours) + (60L * minutes));
    }

    /*
     * Interprets the date representation of TimeBlock and
     * converts into its day in the week.
     *
     * @return String: day of week
     */

    public String dayOfWeek() {
        long days = secondsEpoch / 86400;
        int dayOfWeek =  (int) (days % 7);
        switch (dayOfWeek) {
            case 0:
                return "Thursday";
            case 1:
                return "Friday";
            case 2:
                return "Saturday";
            case 3:
                return "Sunday";
            case 4:
                return "Monday";
            case 5:
                return "Tuesday";
            case 6:
                return "Wednesday";

        };
        return "Error";
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

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

    /*------------------------ TOSTRING ------------------------*/

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