public class ResidentAssistant extends Person{

    private String floor = null;
    private boolean clockedIn = false;
    private Schedule schedule = null;
    private Chat chats = null;

    public ResidentAssistant() {}

    public ResidentAssistant(String floor, boolean clockedIn, Schedule schedule, Chat chats) {
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
    }

    public ResidentAssistant(String name, String email, String password, int[] puid, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockedIn, Schedule schedule, Chat chats) {
        super(name, email, password, puid, gender, role, hall, enabled);
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
    }

    @Override
    public void deleteAccount() {
        super.deleteAccount();
        floor = null;
        clockedIn = false;
        schedule = null;
        chats = null;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public boolean isClockedIn() {
        return clockedIn;
    }

    public void setClockedIn(boolean clockedIn) {
        this.clockedIn = clockedIn;
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

    @Override
    public String toString() {
        return  super.toString() + "\n" +
                "ResidentAssistant{" +
                "floor='" + floor + '\'' +
                ", clockedIn=" + clockedIn +
                ", schedule=" + schedule +
                ", chats=" + chats +
                '}';
    }
}