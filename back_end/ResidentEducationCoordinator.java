import java.util.ArrayList;
public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<ResidentEducationAssistant> reaAccounts = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

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

    public ResidentEducationCoordinator(String name, String email, String password, String id, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, Chat chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(name, email, password, id, gender, role, hall, enabled, floor, clockIn, schedule, chats, raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    @Override
    public void deleteAccount() {
        super.deleteAccount();
        reaAccounts.clear();
        reaAccounts = null;
    }

    public void addReaAccount(ResidentEducationAssistant rea) {
        reaAccounts.add(rea);
    }
    public void deleteReaAccount(ResidentEducationAssistant rea) {
        reaAccounts.remove(rea);
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public ArrayList<ResidentEducationAssistant> getReaAccounts() {
        return reaAccounts;
    }

    public void setReaAccounts(ArrayList<ResidentEducationAssistant> reaAccounts) {
        this.reaAccounts = reaAccounts;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return super.toString() + "\n" +
                "ResidentEducationCoordinator{" +
                "reaAccounts=" + reaAccounts +
                '}';
    }
}