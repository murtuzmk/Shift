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
    private enabled = false;

    /* Default Constructor */
    public Person() {}

    /* Constructor to  */
    public Person(String name, String email, String password, Gender gender, Role role, Hall hall) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.hall = hall;
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

    @java.lang.Override
    public java.lang.String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", gender=" + gender +
                ", role=" + role +
                ", hall=" + hall +
                '}';
    }
}