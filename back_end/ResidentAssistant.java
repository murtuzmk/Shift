public class ResidentAssistant extends Person{

    private String floor = null;
    private boolean clock-in = false;
    private Schedule schedule = null;
    private Chat chats = null;

    public ResidentAssistant() {}

    public ResidentAssistant(String floor, boolean clock, Schedule schedule, Chat chats) {
        this.floor = floor;
        this.clock = clock;
        this.schedule = schedule;
        this.chats = chats;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public boolean isClock() {
        return clock;
    }

    public void setClock(boolean clock) {
        this.clock = clock;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Chat getChats() {
        return chats;
    }

    public void setChats(Chat chats) {
        this.chats = chats;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "ResidentAssistant{" +
                "floor='" + floor + '\'' +
                ", clock=" + clock +
                ", schedule=" + schedule +
                ", chats=" + chats +
                '}';
    }
}