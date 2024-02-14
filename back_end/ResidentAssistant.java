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
}