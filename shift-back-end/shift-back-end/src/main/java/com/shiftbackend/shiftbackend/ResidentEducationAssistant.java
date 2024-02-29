package com.shiftbackend.shiftbackend;


import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;

public class ResidentEducationAssistant extends ResidentAssistant{

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<ResidentAssistant> raAccounts = null;
    private Scheduler masterSchedule = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentEducationAssistant() {
        this.setRole(Role.REA);
    }

    public ResidentEducationAssistant(ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
        this.setRole(Role.REA);
    }

    public ResidentEducationAssistant(String floor, boolean clockIn, Schedule schedule, ArrayList<Chat> chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        super(floor, clockIn, schedule, chats);
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
        this.setRole(Role.REA);
    }

    public ResidentEducationAssistant(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockIn, Schedule schedule, ArrayList<Chat> chats, ArrayList<ResidentAssistant> raAccounts, Scheduler masterSchedule) {
        super(name, email, id, gender, hall, enabled, floor, clockIn, schedule, chats);
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    @Override
    public void saveAccountFile() {
        super.saveAccountFile();
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/back_end", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, true));

            if (raAccounts != null) {
                for (int i = 0; i < raAccounts.size(); i++) {
                    if (i != 0) {
                        pw.print("|");
                    }
                    pw.print(raAccounts.get(i).getId());
                }
            }
            else {
                pw.println("null");
            }

            pw.println("MasterSchedule_" + this.getId() + ".txt");

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
        raAccounts.clear();
        raAccounts = null;
        masterSchedule = null;
    }

    /*
     * Adds a resident assistant to "raAccounts".
     *
     * @param ra: Resident assistant to be added
     */
    public void addRaAccount(ResidentAssistant ra) {
        if (raAccounts == null) {
            raAccounts = new ArrayList<>();
        }
        raAccounts.add(ra);
    }

    /*
     * Removes resident assistant from "reaAccounts", if it
     * exists within the ArrayList.
     *
     * @param ra: Resident assistant to be removed
     */
    public void removeRaAccount(ResidentAssistant ra) {
        if (raAccounts != null) {
            raAccounts.remove(ra);
        }
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