package com.shiftbackend.shiftbackend;


import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class ResidentAssistant extends Person{

    /* ------------------------ VARIABLES ------------------------ */

    private String floor = null;
    private boolean clockedIn = false;
    private Schedule schedule = null;
    private String reaId = null;
    private ArrayList<String> preferences = null;
    private ArrayList<String> chatIds = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentAssistant() {
        this.setRole(Role.RA);
        schedule = new Schedule();
        preferences = new ArrayList<String>();
        chatIds = new ArrayList<String>();
    }

    public ResidentAssistant(String floor, boolean clockedIn) {
        this.floor = floor;
        this.clockedIn = clockedIn;
        schedule = new Schedule();
        preferences = new ArrayList<String>();
        chatIds = new ArrayList<String>();
        this.setRole(Role.RA);
    }

    public ResidentAssistant(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockedIn) {
        super(name, email, id, gender, hall, enabled);
        this.floor = floor;
        this.clockedIn = clockedIn;
        schedule = new Schedule();
        preferences = new ArrayList<String>();
        chatIds = new ArrayList<String>();
        this.setRole(Role.RA);
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    public boolean loadAccountFile(String userId) {
        String fileName = this.getRole() + "_" + userId + ".txt";
        File userInformation = new File(System.getProperty("user.dir"), fileName);
        if (!userInformation.exists()) {
            return false;
        }
        try {
            Scanner reader = new Scanner(userInformation);
            String person = reader.nextLine();
            String ra = reader.nextLine();
            String daysPreferred = reader.nextLine();
            //String raChats = reader.nextLine();

            String[] personAttributes = person.split("[|]");
            String[] raAttributes = ra.split("[|]");
            String[] days = daysPreferred.split("[|]");
            //String[] chatIds = raChats.split("[|]");

            // Set Person attributes.
            this.setName(personAttributes[0]);
            this.setEmail(personAttributes[1]);
            this.setId(userId);
            this.setGender(Person.Gender.valueOf(personAttributes[2]));
            this.setHall(Person.Hall.valueOf(personAttributes[3]));
            this.setEnabled(Boolean.parseBoolean(personAttributes[4]));
            this.setTimezone(Integer.parseInt(personAttributes[5]));


            // Set RA attributes
            floor = raAttributes[0];
            clockedIn = Boolean.parseBoolean(raAttributes[1]);
            reaId = raAttributes[2];

            // Load Preferences
            for (String day : days) {
                if (!day.equals("")) {
                    preferences.add(day);
                }
            }

            // Load Schedule
            schedule.loadScheduleFile(this.getId());

            // Load Chats


            

            reader.close();
        } catch (Exception e) {
            System.out.println("Error in RA Account Loading");
            e.printStackTrace();
            return false;
        }

        return true;
    }

    public void saveAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir"), fileName);
        try {
            PrintWriter pw = new PrintWriter(new FileOutputStream(userInformation, false));

            pw.println(this.getName() + "|" + this.getEmail() + "|" + this.getGender() + "|" + this.getHall() + "|" + this.isEnabled() + "|" + this.getTimezone());
            pw.println(floor + "|" + clockedIn + "|" + reaId);

            for (int i = 0; i < preferences.size(); i++) {
                if (i != 0) {
                    pw.print("|");
                }
                pw.print(preferences.get(i));
            }
            pw.println();

            schedule.saveScheduleFile(this.getId());

            /* 
            if (chats != null) {
                for (int i = 0; i < chats.size(); i++) {
                    if (i != 0) {
                        pw.print("|");
                    }
                    pw.print(chats.get(i).getId());
                }
            }
            */


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in RA Account Saving");
            e.printStackTrace();
        }
    }

    public boolean deleteAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir"), fileName);
        return (userInformation.delete() && schedule.deleteAccountFile(this.getId()));
    }

    /*
     * Deletes the contents of all variables related to this class
     * and superclass and sets them to null.
     */
    @Override
    public void deleteUserInformation() {
        super.deleteUserInformation();
        floor = null;
        clockedIn = false;
        schedule = new Schedule();
        chatIds = new ArrayList<String>();
    }

    /*
     * Adds a chat the chats of the current resident assistant.
     * It will append it to the end of the doubly linked list of chats.
     *
     * @param inputChat: The chat to add to the list
     */
    public void addChat(String chatId) {
        chatIds.add(chatId);
    }

    /*
     * Removes chat from chats list of the current resident assistant.
     * It will not do anything if the given id does not exist
     * within the list.
     *
     * @param Chat: The chat to remove from the list
     */
    public void deleteChat(String chatId) {
        chatIds.remove(chatId);
    }

    public void addPreferences(String day) {
        preferences.add(day);
    }

    public void clearPreferences() {
        preferences = new ArrayList<String>();
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getReaId() {
        return reaId;
    }

    public void setReaId(String reaId) {
        this.reaId = reaId;
    }
    
    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public boolean isClockedIn() {
        return clockedIn;
    }

    public void setClockedIn(boolean clockedIn) {
        this.clockedIn = clockedIn;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public ArrayList<String> getPreferences() {
        return preferences;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return  super.toString() + "\n" +
                "ResidentAssistant{" +
                "floor='" + floor + '\'' +
                ", clockedIn=" + clockedIn +
                '}';
    }

    public String userString() {
        return  "{\"name\": \"" + this.getName() + "\",\n" + 
                "\"email\": \"" + this.getEmail() + "\",\n" + 
                "\"id\": \"" + this.getId() + "\",\n" + 
                "\"gender\": \"" + this.getGender() + "\",\n" + 
                "\"role\": \"" + this.getRole() + "\",\n" + 
                "\"hall\": \"" + this.getHall() + "\",\n" + 
                "\"enabled\": \"" + this.isEnabled() + "\",\n" + 
                "\"timezone\": \"" + this.getTimezone() + "\",\n" + 
                "\"floor\": \"" + this.getFloor() + "\",\n" + 
                "\"clockedIn\": \"" + this.isClockedIn() + "\"\n}";
    }
}