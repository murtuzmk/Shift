import java.util.ArrayList;

public class ResidentEducationAssistant extends ResidentAssistant{

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<ResidentAssistant> raAccounts = null;
    private Scheduler masterSchedule = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentEducationAssistant() {}

    public ResidentEducationAssistant(ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
    }

    public ResidentEducationAssistant(String floor, boolean clockIn, Schedule schedule, Chat chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        super(floor, clockIn, schedule, chats);
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
    }

    public ResidentEducationAssistant(String name, String email, String password, String id, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, Chat chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        super(name, email, password, id, gender, role, hall, enabled, floor, clockIn, schedule, chats);
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    @Override
    public void deleteAccount() {
        super.deleteAccount();
        raAccounts.clear();
        raAccounts = null;
        masterSchedule = null;
    }

    public void addRaAccount(ResidentAssistant ra) {
        raAccounts.add(ra);
    }
    public void deleteRaAccount(ResidentAssistant ra) {
        raAccounts.remove(ra);
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public ArrayList<ResidentAssistant> getRaAccounts() {
        return raAccounts;
    }

    public void setRaAccounts(ArrayList<ResidentAssistant> raAccounts) {
        this.raAccounts = raAccounts;
    }

    public Scheduler getMasterSchedule() {
        return masterSchedule;
    }

    public void setMasterSchedule(Scheduler masterSchedule) {
        this.masterSchedule = masterSchedule;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return super.toString() + "\n" +
                "ResidentEducationAssistant{" +
                "raAccounts=" + raAccounts +
                ", masterSchedule=" + masterSchedule +
                '}';
    }
}