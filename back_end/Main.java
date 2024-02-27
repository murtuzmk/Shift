public class Main {
    public static void main(String[] args) {

        /* Person person = new Person();
        person.setTimezone(1);
        System.out.println(person.toString());
        TimeBlock time = new TimeBlock(17, 37, 2, 17, 2024, 0);
        System.out.println(time.toString());
        System.out.println(time.dayOfWeek());
        System.out.println(time.isExpired(0, 0, 0));
        time = new TimeBlock(9, 37, 2, 17, 2024, -8);
        System.out.println(time.toString());
        System.out.println(time.dayOfWeek());
        System.out.println(time.isExpired(0, 0, 0));
        */

        ResidentAssistant ra = new ResidentAssistant("Alice", "dummy@gmail.com", "1234", "0123456789",
                Person.Gender.FEMALE, Person.Role.RA, Person.Hall.CARY, true, "1A", false, null, null);
        ResidentEducationAssistant rea = new ResidentEducationAssistant("Bob", "dummy@gmail.com", "1234", "1234567890",
                Person.Gender.MALE, Person.Role.REA, Person.Hall.CARY, true, "1A", false, null, null, null, null);
        ResidentEducationAssistant rec = new ResidentEducationCoordinator("Cab", "dummy@gmail.com", "1234", "2345678901",
                Person.Gender.NONBINARY, Person.Role.REC, Person.Hall.CARY, true, "1A", false, null, null, null, null, null);

        //ResidentAssistant person = new ResidentAssistant();
        //person.loadAccountFile(Person.Role.RA, "0123456789");

        ra.saveAccountFile();
        ra.deleteAccountFile();
        rea.saveAccountFile();
        rea.deleteAccountFile();
        rec.saveAccountFile();
        rec.deleteAccountFile();
    }
}
