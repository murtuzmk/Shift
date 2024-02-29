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
    private ArrayList<Chat> chats = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentAssistant() {
        this.setRole(Role.RA);
    }

    public ResidentAssistant(String floor, boolean clockedIn, Schedule schedule, ArrayList<Chat> chats) {
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
        this.setRole(Role.RA);
    }

    public ResidentAssistant(String name, String email, String id, Gender gender, Hall hall, boolean enabled, String floor, boolean clockedIn, Schedule schedule, ArrayList<Chat> chats) {
        super(name, email, id, gender, hall, enabled);
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
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
            String raSchedule = reader.nextLine();
            String raChats = reader.nextLine();

            String[] personAttributes = person.split("[|]");
            String[] raAttributes = ra.split("[|]");
            String[] chatIds = raChats.split("[|]");

            // Set Person attributes.
            this.setName(personAttributes[0]);
            this.setEmail(personAttributes[1]);
            this.setId(userId);
            this.setGender(Gender.valueOf(personAttributes[2]));
            this.setHall(Hall.valueOf(personAttributes[3]));
            this.setEnabled(Boolean.parseBoolean(personAttributes[4]));

            // Set RA attributes
            floor = raAttributes[0];
            clockedIn = Boolean.parseBoolean(raAttributes[1]);
            schedule = new Schedule();
            schedule.loadScheduleFile(raSchedule);


            for (String str : chatIds) {
                System.out.println(str);
            }

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

            pw.println(getName() + "|" + getEmail() + "|" + getGender() + "|" + "|" + getHall() + "|" + isEnabled() + "|" + getTimezone());
            pw.println(floor + "|" + clockedIn);
            pw.println("Schedule_" + this.getId() + ".txt");

            if (chats != null) {
                for (int i = 0; i < chats.size(); i++) {
                    if (i != 0) {
                        pw.print("|");
                    }
                    pw.print(chats.get(i).getId());
                }
            }
            else {
                pw.println("null");
            }


            pw.close();
        } catch (Exception e) {
            System.out.println("Error in RA Account Saving");
            e.printStackTrace();
        }
    }

    public boolean deleteAccountFile() {
        String fileName = this.getRole() + "_" + this.getId() + ".txt";
        File userInformation = new File(System.getProperty("user.dir"), fileName);
        return userInformation.delete();
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
        schedule = null;
        chats = null;
    }

    /*
     * Adds a chat the chats of the current resident assistant.
     * It will append it to the end of the doubly linked list of chats.
     *
     * @param inputChat: The chat to add to the list
     */
    public void addChat(Chat chat) {
        if (chats == null) {
            chats = new ArrayList<>();
        }
        chats.add(chat);
    }

    /*
     * Removes chat from chats list of the current resident assistant.
     * It will not do anything if the given id does not exist
     * within the list.
     *
     * @param Chat: The chat to remove from the list
     */
    public void deleteChat(Chat chat) {
        if (chats != null) {
            chats.remove(chat);
        }
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

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

    public ArrayList<Chat> getChats() {
        return chats;
    }

    public void setChats(ArrayList<Chat> chats) {
        this.chats = chats;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return  super.toString() + "\n" +
                "ResidentAssistant{" +
                "floor='" + floor + '\'' +
                ", clockedIn=" + clockedIn +
                ", schedule=" + schedule +
                ", chats=" + chats +
                '}';
    }
}