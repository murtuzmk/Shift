package com.shiftbackend.shiftbackend;


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

        ResidentAssistant ra = new ResidentAssistant("Alice", "dummyAlice@gmail.com", "0123456789", Person.Gender.FEMALE, Person.Hall.CARY, true, "1A", false);
        ResidentEducationAssistant rea = new ResidentEducationAssistant("Bob", "dummyBob@gmail.com",  "1234567890", Person.Gender.MALE, Person.Hall.WILEY, true, "1A", false);
        ResidentEducationAssistant rec = new ResidentEducationCoordinator("Cab", "dummyCab@gmail.com", "2345678901", Person.Gender.NONBINARY, Person.Hall.OWEN, true, "1A", false);

        //ResidentAssistant personRA = new ResidentAssistant();
        //System.out.println(personRA.loadAccountFile("0123456789"));

        ResidentEducationAssistant personREA = new ResidentEducationAssistant();
        System.out.println(personREA.loadAccountFile("1234567890"));

        //ra.getSchedule().addEvent(new Shift("Event1", "TestA", "asdfasdf", new TimeBlock(0, 0, 2, 29, 2024, 0), new TimeBlock(0, 0, 3, 10, 2024, 0), Shift.DutyLevel.PRIMARY));
        //personRA.getSchedule().deleteEvent("Event1");
        //personRA.saveAccountFile();
        //ra.saveAccountFile();
        //ra.deleteAccountFile();

        personREA.addRaAccount("456");
        personREA.removeRaAccount("123");
        personREA.saveAccountFile();
        //rea.saveAccountFile();
        //rea.deleteAccountFile();
        //rec.saveAccountFile();
        //rec.deleteAccountFile();
    }
}
