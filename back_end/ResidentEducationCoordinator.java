import java.util.ArrayList;
public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    private ArrayList<ResidentEducationAssistant> reaAccounts = null;

    public ResidentEducationCoordinator() {}

    public ResidentEducationCoordinator(ArrayList<ResidentEducationAssistant> reaAccounts) {
        this.reaAccounts = reaAccounts;
    }

    public ResidentEducationCoordinator(ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
    }

    public ResidentEducationCoordinator(String floor, boolean clockIn, Schedule schedule, Chat chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(floor, clockIn, schedule, chats, raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
    }

    public ResidentEducationCoordinator(String name, String email, String password, int[] puid, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, Chat chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(name, email, password, puid, gender, role, hall, enabled, floor, clockIn, schedule, chats, raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
    }

    public ArrayList<ResidentEducationAssistant> getReaAccounts() {
        return reaAccounts;
    }

    public void setReaAccounts(ArrayList<ResidentEducationAssistant> reaAccounts) {
        this.reaAccounts = reaAccounts;
    }

    @Override
    public String toString() {
        return "ResidentEducationCoordinator{" +
                "reaAccounts=" + reaAccounts +
                '}';
    }
}