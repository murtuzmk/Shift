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

        ResidentAssistant person = new ResidentAssistant();
        System.out.println( person.loadAccountFile("0123456789"));

        ra.saveAccountFile();
        //ra.deleteAccountFile();
        //rea.saveAccountFile();
        //rea.deleteAccountFile();
        //rec.saveAccountFile();
        //rec.deleteAccountFile();
    }
}
