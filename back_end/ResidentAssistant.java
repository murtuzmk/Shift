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
}