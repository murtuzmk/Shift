public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
        Person person = new Person();
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
    }
}
