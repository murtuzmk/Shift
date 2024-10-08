package com.shiftbackend.shiftbackend;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    /* ------------------------ VARIABLES ------------------------ */

    private ArrayList<String> reaAccounts = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentEducationCoordinator() {
        reaAccounts = new ArrayList<String>();
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(String floor, boolean clockIn) {
        super(floor, clockIn);
        reaAccounts = new ArrayList<String>();
        this.setRole(Role.REC);
    }

    public ResidentEducationCoordinator(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockIn) {
        super(name, email, id, gender, hall, enabled, floor, clockIn);
        reaAccounts = new ArrayList<String>();
        this.setRole(Role.REC);
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
            // Master Schedule
            String rec = reader.nextLine();

            String[] personAttributes = person.split("[|]");
            String[] raAttributes = ra.split("[|]");
            String[] days = daysPreferred.split("[|]");
            //String[] chatIds = raChats.split("[|]");
            String[] reaAttributes = rea.split("[|]");
            // Master Schedule
            String[] recAttributes = rec.split("[|]");

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
            this.setReported(Integer.parseInt(raAttributes[3]));


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
            this.getRaAccounts().clear();
            for (String raId : reaAttributes) {
                if (!raId.equals("")) {
                    this.getRaAccounts().add(raId);
                }
            }

            // Load Master Schedule

            // Load REC Attributes
            reaAccounts.clear();
            for (String reaId : recAttributes) {
                if (!reaId.equals("")) {
                    reaAccounts.add(reaId);
                }
            }
            

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in REC Account Loading");
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
            pw.println(this.getFloor() + "|" + this.isClockedIn() + "|" + this.getTimezone() + "|" + this.getReports());

            // Save RA Preferences
            for (int i = 0; i < getPreferences().size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(getPreferences().get(i));
            }
            pw.println();

            getSchedule().saveScheduleFile(this.getId());

            // Save Chats

            for (int i = 0; i < this.getRaAccounts().size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(this.getRaAccounts().get(i));
            }
            pw.println();

            // Save Master Schedule

            for (int i = 0; i < reaAccounts.size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(reaAccounts.get(i));
            }
            pw.println();


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in REC Account Saving");
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
        reaAccounts = new ArrayList<String>();
    }

    /*
     * Adds a resident education assistant to "reaAccounts".
     *
     * @param rea: Resident education assistant to be added
     */
    public void addReaAccount(String rea) {
        reaAccounts.add(rea);
    }

    /*
     * Removes resident education assistant from "reaAccounts",
     * if it exists within the ArrayList.
     *
     * @param rea: Resident education assistant to be removed
     */
    public void removeReaAccount(String reaId) {
        reaAccounts.remove(reaId);
    }

    public String[] getREAs() {
        String[] array = new String[reaAccounts.size()];

        for (int i = 0; i < reaAccounts.size(); i++) {
            array[i] = "{\"reaId\": \"" + reaAccounts.get(i) + "\"}";
            
        }

        return array;
    }

    @Override
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

    @Override
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

    @Override
    public boolean deleteWelcomeMessage() {
        String fileName = "Welcome_Message_" + this.getRole() + "_" + this.getId() + ".txt";
        File welcomeMessage = new File(System.getProperty("user.dir") + "/test_database", fileName);
        return welcomeMessage.delete();
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public ArrayList<String> getReaAccounts() {
        return reaAccounts;
    }

    public void setReaAccounts(ArrayList<String> reaAccounts) {
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