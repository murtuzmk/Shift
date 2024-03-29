package com.shiftbackend.shiftbackend;


import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class ResidentEducationAssistant extends ResidentAssistant{

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<String> raAccounts = null;
    private Scheduler masterSchedule = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentEducationAssistant() {
        raAccounts = new ArrayList<String>();
        masterSchedule = new Scheduler();
        this.setRole(Role.REA);
    }

    public ResidentEducationAssistant(String floor, boolean clockIn) {
        super(floor, clockIn);
        raAccounts = new ArrayList<String>();
        masterSchedule = new Scheduler();
        this.setRole(Role.REA);
    }

    public ResidentEducationAssistant(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockIn) {
        super(name, email, id, gender, hall, enabled, floor, clockIn);
        raAccounts = new ArrayList<String>();
        masterSchedule = new Scheduler();
        this.setRole(Role.REA);
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    @Override
    public boolean loadAccountFile(String userId) {
        String fileName = this.getRole() + "_" + userId + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        if (!userInformation.exists()) {
            return false;
        }
        try {
            Scanner reader = new Scanner(userInformation);
            String person = reader.nextLine();
            String ra = reader.nextLine();
            String daysPreferred = reader.nextLine();
            //String raChats = reader.nextLine();
            String rea = reader.nextLine();

            String[] personAttributes = person.split("[|]");
            String[] raAttributes = ra.split("[|]");
            String[] days = daysPreferred.split("[|]");
            //String[] chatIds = raChats.split("[|]");
            String[] reaAttributes = rea.split("[|]");

            // Set Person attributes.
            this.setName(personAttributes[0]);
            this.setEmail(personAttributes[1]);
            this.setId(userId);
            
            if (personAttributes[2] != "null") {
                this.setGender(Person.Gender.valueOf(personAttributes[2]));
            }
            if (personAttributes[3] != "null") {
                this.setHall(Person.Hall.valueOf(personAttributes[3]));
            }

            this.setEnabled(Boolean.parseBoolean(personAttributes[4]));
            this.setTimezone(Integer.parseInt(personAttributes[5]));

            // Set RA attributes
            this.setFloor(raAttributes[0]);
            this.setClockedIn(Boolean.parseBoolean(raAttributes[1]));
            this.setReaId(raAttributes[2]);

            // Load Preferences
            this.getPreferences().clear();
            for (String day : days) {
                if (!day.equals("")) {
                    this.getPreferences().add(day);
                }
            }
            
            // Load Schedule
            this.getSchedule().loadScheduleFile(this.getId());

            // Load Chats

            // Load REA attributes
            raAccounts.clear();
            for (String raId : reaAttributes) {
                if (!raId.equals("")) {
                    raAccounts.add(raId);
                }
            }

            // Load Master Schedule
            

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in REA Account Loading");
            e.printStackTrace();
            return false;
        }

        return true;
    }

    @Override
    public void saveAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, false));

            pw.println(this.getName() + "|" + this.getEmail() + "|" + this.getGender() + "|" + this.getHall() + "|" + this.isEnabled() + "|" + this.getTimezone());
            pw.println(this.getFloor() + "|" + this.isClockedIn() + "|" + this.getTimezone());

            for (int i = 0; i < getPreferences().size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(getPreferences().get(i));
            }
            pw.println();

            getSchedule().saveScheduleFile(this.getId());

            // Save Chats

            for (int i = 0; i < raAccounts.size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(raAccounts.get(i));
            }
            pw.println();

            // Save Master Schedule


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in REA Account Saving");
            e.printStackTrace();
        }
    }

    @Override
    public boolean deleteAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir") + "/test_database", fileName);
        return (userInformation.delete() && getSchedule().deleteAccountFile(this.getId()));
    }

    /*
     * Deletes the contents of all variables related to this class
     * and superclasses and sets them to null.
     */
    @Override
    public void deleteUserInformation() {
        super.deleteUserInformation();
        raAccounts = new ArrayList<String>();
        masterSchedule = new Scheduler();
    }

    /*
     * Adds a resident assistant to "raAccounts".
     *
     * @param ra: Resident assistant to be added
     */
    public void addRaAccount(String raId) {
        raAccounts.add(raId);
    }

    /*
     * Removes resident assistant from "reaAccounts", if it
     * exists within the ArrayList.
     *
     * @param ra: Resident assistant to be removed
     */
    public void removeRaAccount(String raId) {
        raAccounts.remove(raId);
    }

    public String getRAs() {
        StringBuilder buffer = new StringBuilder();

        buffer.append("{\"raIds\": \"");
        for (int i = 0; i < raAccounts.size(); i++) {
            if (i != 0) {
                buffer.append("|");
            }
            buffer.append(raAccounts.get(i));
            
        }
        buffer.append("\"}");

        return buffer.toString();
    }

    public void createWelcomeMessage(String input) {
        String fileName = "Welcome_Message_" + this.getRole() + "_" + this.getId() + ".txt";
        File welcomeMessage = new File(System.getProperty("user.dir") + "/test_database", fileName);

        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(welcomeMessage, false));

            pw.println(input);

            pw.close();
        } catch (Exception e) {
            System.out.println("Error in Account Saving");
            e.printStackTrace();
        }
    }

    public String getWelcomeMessage() {
        String fileName = "Welcome_Message_" + this.getRole() + "_" + this.getId() + ".txt";
        File welcomeMessage = new File(System.getProperty("user.dir") + "/test_database", fileName);
        String message = "Error Loading Welcome Message";

        try {
            Scanner reader = new Scanner(welcomeMessage);
            StringBuffer buffer = new StringBuffer();

            buffer.append("{ \"message\" : \"");

            buffer.append(reader.nextLine());

            buffer.append("\" }");

            message = buffer.toString();

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in Welcome Message Loading");
            e.printStackTrace();
        }

        return message;
    }

    public boolean deleteWelcomeMessage() {
        String fileName = "Welcome_Message_" + this.getRole() + "_" + this.getId() + ".txt";
        File welcomeMessage = new File(System.getProperty("user.dir") + "/test_database", fileName);
        return welcomeMessage.delete();
    }


    /*------------------------ GETTERS & SETTERS ------------------------*/

    public ArrayList<String> getRaAccounts() {
        return raAccounts;
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