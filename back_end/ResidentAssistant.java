public class ResidentAssistant extends Person{

    private String floor = null;
    private boolean clockIn = false;
    private Schedule schedule = null;
    private Chat chats = null;

    public ResidentAssistant() {}

    public ResidentAssistant(String floor, boolean clockIn, Schedule schedule, Chat chats) {
        this.floor = floor;
        this.clockIn = clockIn;
        this.schedule = schedule;
        this.chats = chats;
    }

    public ResidentAssistant(String name, String email, String password, int[] puid, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, Chat chats) {
        super(name, email, password, puid, gender, role, hall, enabled);
        this.floor = floor;
        this.clockIn = clockIn;
        this.schedule = schedule;
        this.chats = chats;
    }
}