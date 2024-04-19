package com.shiftbackend.shiftbackend;


import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

import com.shiftbackend.shiftbackend.Shift.DutyLevel;

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
            pw.println(this.getFloor() + "|" + this.isClockedIn() + "|" + this.getTimezone() + "|" + this.getReports());

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
        if (!raAccounts.contains(raId)) {
            raAccounts.add(raId);
        }
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

    public void assignShifts() {
        Shift[] shifts = this.getSchedule().shiftsArray();
        ResidentAssistant ra = new ResidentAssistant();
        String raId;
        int j = 0;
        for (int i = 0; (i < shifts.length && j < raAccounts.size()); ) {
            if (shifts[i].getAvailability() > 0) {
                this.getSchedule().getEvent(shifts[i].getId()).decAvailability();

                raId = raAccounts.get(j);
                ra.loadAccountFile(raId);

                ra.getSchedule().addEvent(new Shift (shifts[i].getId(), shifts[i].getTitle(), shifts[i].getDescription(), shifts[i].getStart(), shifts[i].getEnd(), shifts[i].getDutyLevel()));
                ra.saveAccountFile();
                j++;
            }
            else {
                i++;
            }
        }
    }

    public void randomlyAssignShifts() {
        Shift[] shifts = this.getSchedule().shiftsArray();
        
        // Shuffle RA Accounts
        Collections.shuffle(raAccounts);
        
        ResidentAssistant ra = new ResidentAssistant();
        String raId;
        int j = 0;
        for (int i = 0; (i < shifts.length && j < raAccounts.size());) {
            if (shifts[i].getAvailability() > 0) {
                this.getSchedule().getEvent(shifts[i].getId()).decAvailability();

                raId = raAccounts.get(j);
                ra.loadAccountFile(raId);

                ra.getSchedule().addEvent(new Shift (shifts[i].getId(), shifts[i].getTitle(), shifts[i].getDescription(), shifts[i].getStart(), shifts[i].getEnd(), shifts[i].getDutyLevel()));
                ra.saveAccountFile();
                j++;
            }
            else {
                i++;
            }
        }
    }

    public void automaticallyAssignShifts() {
        Shift[] shifts = this.getSchedule().shiftsArray();

        ArrayList<String> ras = (ArrayList<String>) raAccounts.clone();
        
        ResidentAssistant ra = new ResidentAssistant();
        String raId;
        for (int i = 0; (i < shifts.length && ras.size() > 0);) {
            if (shifts[i].getAvailability() > 0) {
                sortArrayList(ras, shifts[i].getDutyLevel());

                this.getSchedule().getEvent(shifts[i].getId()).decAvailability();

                raId = ras.get(0);
                ra.loadAccountFile(raId);

                ra.getSchedule().addEvent(new Shift (shifts[i].getId(), shifts[i].getTitle(), shifts[i].getDescription(), shifts[i].getStart(), shifts[i].getEnd(), shifts[i].getDutyLevel()));
                ra.saveAccountFile();

                ras.remove(raId);
            }
            else {
                i++;
            }
        }
    }

    public void sortArrayList(ArrayList<String> ras, DutyLevel level) {
        String a;
        String b;
        ResidentAssistant raA = new ResidentAssistant();
        ResidentAssistant raB = new ResidentAssistant();

        for (int i = ras.size() - 1; i > 0; i--) {
            for (int j = 0; j < i; j++) {
                a = ras.get(j);
                b = ras.get(j + 1);

                raA.loadAccountFile(a);
                raB.loadAccountFile(b);

                switch(level) {
                    case PRIMARY:
                        if (raA.primaryShiftsCompleted() > raB.primaryShiftsCompleted()) {
                            ras.set(j, b);
                            ras.set(j + 1, a);
                        }
                        else if (raA.primaryShiftsCompleted() == raB.primaryShiftsCompleted()) {
                            if (raA.totalShiftsCompleted() > raB.totalShiftsCompleted()) {
                                ras.set(j, b);
                                ras.set(j + 1, a);
                            }
                        }
                        break;
                    case SECONDARY:
                        if (raA.secondaryShiftsCompleted() > raB.secondaryShiftsCompleted()) {
                            ras.set(j, b);
                            ras.set(j + 1, a);
                        }
                        else if (raA.secondaryShiftsCompleted() == raB.secondaryShiftsCompleted()) {
                            if (raA.totalShiftsCompleted() > raB.totalShiftsCompleted()) {
                                ras.set(j, b);
                                ras.set(j + 1, a);
                            }
                        }
                        break;
                    case TERTIARY:
                    if (raA.tertiaryShiftsCompleted() > raB.tertiaryShiftsCompleted()) {
                        ras.set(j, b);
                        ras.set(j + 1, a);
                    }
                    else if (raA.tertiaryShiftsCompleted() == raB.tertiaryShiftsCompleted()) {
                        if (raA.totalShiftsCompleted() > raB.totalShiftsCompleted()) {
                            ras.set(j, b);
                            ras.set(j + 1, a);
                        }
                    }
                        break;
                    default:
                        if (raA.primaryShiftsCompleted() > raB.primaryShiftsCompleted()) {
                            ras.set(j, b);
                            ras.set(j + 1, a);
                        }
                        else if (raA.primaryShiftsCompleted() == raB.primaryShiftsCompleted()) {
                            if (raA.totalShiftsCompleted() > raB.totalShiftsCompleted()) {
                                ras.set(j, b);
                                ras.set(j + 1, a);
                            }
                        }
                        break;
                }
            }
        }
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