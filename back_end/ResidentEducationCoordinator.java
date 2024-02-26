import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
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

    public void saveAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, false));
            pw.println(this.toString() + "\n");
            pw.close();
        } catch (Exception e) {
            System.out.println("Error in RA Account Saving");
            e.printStackTrace();
        }
    }

    @Override
    public boolean deleteAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        return userInformation.delete();
    }

    /*
     * Deletes the contents of all variables related to this class
     * and superclasses and sets them to null.
     */
    @Override
    public void deleteAccount() {
        super.deleteAccount();
        reaAccounts.clear();
        reaAccounts = null;
    }

    /*
     * Adds a resident education assistant to "reaAccounts".
     *
     * @param rea: Resident education assistant to be added
     */
    public void addReaAccount(ResidentEducationAssistant rea) {
        if (reaAccounts == null) {
            reaAccounts = new ArrayList<>();
        }
        reaAccounts.add(rea);
    }

    /*
     * Deletes resident education assistant from "reaAccounts",
     * if it exists within the ArrayList.
     *
     * @param rea: Resident education assistant to be removed
     */
    public void deleteReaAccount(ResidentEducationAssistant rea) {
        if (reaAccounts != null) {
            reaAccounts.remove(rea);
        }
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