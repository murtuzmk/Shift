import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;

public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<ResidentEducationAssistant> reaAccounts = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentEducationCoordinator() {
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(ArrayList<ResidentEducationAssistant> reaAccounts) {
        this.reaAccounts = reaAccounts;
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(String floor, boolean clockIn, Schedule schedule, ArrayList<Chat> chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(floor, clockIn, schedule, chats, raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, ArrayList<Chat> chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule, ArrayList<ResidentEducationAssistant> reaAccounts) {
        super(name, email, id, gender, hall, enabled, floor, clockIn, schedule, chats, raAccounts, masterSchedule);
        this.reaAccounts = reaAccounts;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    @Override
    public void saveAccountFile() {
        super.saveAccountFile();
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, true));

            if (reaAccounts != null) {
                for (int i = 0; i < reaAccounts.size(); i++) {
                    if (i != 0) {
                        pw.print("|");
                    }
                    pw.print(reaAccounts.get(i).getId());
                }
            } else {
                pw.println("null");
            }


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in REA Account Saving");
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
    public void deleteUserInformation() {
        super.deleteUserInformation();
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
     * Removes resident education assistant from "reaAccounts",
     * if it exists within the ArrayList.
     *
     * @param rea: Resident education assistant to be removed
     */
    public void removeReaAccount(ResidentEducationAssistant rea) {
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