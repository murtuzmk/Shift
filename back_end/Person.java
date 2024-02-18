import java.util.Arrays;

public class Person {

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
        FRIEDA_PARKER_HALL,
        WINIFRED_PARKER_HALL,
        HARRISON_HALL,
        HAWKINGS_HALL,
        HILLENBRAND_HALL,
        HONORS_COLLEGE,
        OWEN_HALL,
        SHREVE_HALL,
        WILEY
    }

    private String name = null;
    private String email = null;
    private String password = null;
    private int[] puid = null;
    private Gender gender = null;
    private Role role = null;
    private Hall hall = null;
    private boolean enabled = false;
    private int timezone = 0;

    /* Default Constructor */
    public Person() {}

    public Person(String name, String email, String password, int[] puid, Gender gender, Role role, Hall hall, boolean enabled) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.puid = puid;
        this.gender = gender;
        this.role = role;
        this.hall = hall;
        this.enabled = enabled;
    }

    public void enableAccount() {
        enabled = true;
    }

    public void disableAccount() {
        enabled = false;
    }

    public void deleteAccount() {
        name = null;
        email = null;
        password = null;
        puid = null;
        gender = null;
        role = null;
        hall = null;
        enabled = false;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int[] getPuid() {
        return puid;
    }

    public void setPuid(int[] puid) {
        this.puid = puid;
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

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", puid=" + Arrays.toString(puid) +
                ", gender=" + gender +
                ", role=" + role +
                ", hall=" + hall +
                ", enabled=" + enabled +
                ((timezone < 0) ? String.format(", timezone= %03d", timezone) : String.format(", timezone= +%02d", timezone)) +
                '}';
    }
}