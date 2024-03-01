package com.shiftbackend.shiftbackend;


public class Person {

    /* ------------------------ ENUMS ------------------------ */


    public enum Gender {
        MALE,
        FEMALE,
        NONBINARY
    }

    public enum Role {
        RA,
        REA,
        REC
    }

    public enum Hall {

        /* All Male */
        CARY,
        MCCUTCHEON,
        TARKINGTON,

        /* All Female */
        MEREDITH,
        MEREDITH_SOUTH,
        WINDSOR,

        /* Co-Ed */
        EARHART,
        FIRST_STREET_TOWERS,
        FRIEDA_PARKER,
        WINIFRED_PARKER,
        HARRISON,
        HAWKINS,
        HILLENBRAND,
        HONORS_COLLEGE,
        OWEN,
        SHREVE,
        WILEY,
        URBA //official acronym for apartments at Purdue
    }

    /* ------------------------ VARIABLES ------------------------ */

    private String name = null;
    private String email = null;
    private String id = null;
    private Gender gender = null;
    private Role role = null;
    private Hall hall = null;
    private boolean enabled = false;
    private int timezone = 0;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Person() {}

    public Person(String name, String email, String id, Gender gender, Hall hall, boolean enabled) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.gender = gender;
        this.hall = hall;
        this.enabled = enabled;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*
     * Deletes the contents of all variables related to this class
     * and superclasses and sets them to null.
     */
    public void deleteUserInformation() {
        name = null;
        email = null;
        id = null;
        gender = null;
        role = null;
        hall = null;
        enabled = false;
    }

    /*
     * Enables account of current person.
     */
    public void enableAccount() {
        enabled = true;
    }

    /*
     * Disables account of current person.
     */
    public void disableAccount() {
        enabled = false;
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Hall getHall() {
        return hall;
    }

    public void setHall(Hall hall) {
        this.hall = hall;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getTimezone() {
        return timezone;
    }

    public void setTimezone(int timezone) {
        this.timezone = timezone;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", id=" + id +
                ", gender=" + gender +
                ", role=" + role +
                ", hall=" + hall +
                ", enabled=" + enabled +
                ((timezone < 0) ? String.format(", timezone= %03d", timezone) : String.format(", timezone= +%02d", timezone)) +
                '}';
    }
}