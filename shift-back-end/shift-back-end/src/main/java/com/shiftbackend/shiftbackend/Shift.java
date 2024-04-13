package com.shiftbackend.shiftbackend;

public class Shift {

    /* ------------------------ ENUMS ------------------------ */

    public enum DutyLevel {
        PRIMARY,
        SECONDARY,
        TERTIARY
    }

    /* ------------------------ VARIABLES ------------------------ */

    private String id = null;
    private String title = null;
    private String description = null;
    private TimeBlock start = null;
    private TimeBlock end = null;
    private DutyLevel dutyLevel = null;

    // For REAs only

    private int availability = 0;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Shift() {}

    public Shift(String id, String title, String description, TimeBlock start, TimeBlock end, DutyLevel dutyLevel, int availability) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.dutyLevel = dutyLevel;
        this.availability = availability;
    }

    public Shift(String id, String title, String description, TimeBlock start, TimeBlock end, DutyLevel dutyLevel) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.dutyLevel = dutyLevel;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public int getAvailability() {
        return availability;
    }

    public void setAvailability(int availability) {
        this.availability = availability;
    }

    public void incAvailability() {
        availability++;
    }

    public void decAvailability() {
        availability--;
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