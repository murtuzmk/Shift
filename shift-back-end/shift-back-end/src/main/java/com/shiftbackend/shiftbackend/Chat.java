package com.shiftbackend.shiftbackend;


import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class Chat {

    /* ------------------------ VARIABLES ------------------------ */

    private int id = -1;
    private ArrayList<Person> members = null;
    private Message messages = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Chat() {
    }

    public Chat(int id, ArrayList<Person> members, Message messages) {
        this.id = id;
        this.members = members;
        this.messages = messages;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*
     * Adds message to the message list of the current chat.
     * It will append it to the end of the doubly linked list.
     *
     * @param inputMessage: The message to add to the list
     */
    public void sendMessage(Message inputMessage) {

        /* Check if list is empty */
        if (messages == null) {
            messages = inputMessage;
            inputMessage.setPrev(inputMessage);
            inputMessage.setNext(inputMessage);
            return;
        }

        /* Append message to end of list */
        Message prevMessage = messages.getPrev();
        Message nextMessage = messages;

        inputMessage.setPrev(prevMessage);
        inputMessage.setNext(nextMessage);
        prevMessage.setNext(inputMessage);
        nextMessage.setPrev(inputMessage);
    }

    /*
     * Removes message from message list of the current chat.
     * It will not do anything if the given id does not exist
     * within the list.
     *
     * @param id: The id of message to remove from the list
     */
    public void deleteMessage(int id) {

        /* Check if list is empty */
        if (messages == null) {
            return;
        }

        /* Message to be deleted is the only existing message */
        if ((messages == messages.getNext()) && (messages.getId() == id)) {
            messages = null;
            return;
        }

        /* Search for message in chat based on id */
        Message currentMessage = messages;
        Message firstMessage = messages;

        do {

            /* Message is found */
            if (currentMessage.getId() == id) {
                break;
            }

            /* Next message */
            currentMessage = currentMessage.getNext();

        } while (currentMessage != firstMessage);

        /* Message not found */
        if (currentMessage == firstMessage) {
            return;
        }

        /* Message found */

        Message prevMessage = currentMessage.getPrev();
        Message nextMessage = currentMessage.getNext();

        prevMessage.setNext(nextMessage);
        nextMessage.setPrev(prevMessage);
    }

    /*
     * Finds message within messages list and pins/unpins that message.
     * It will not do anything if the given id does not exist within
     * the list.
     *
     * @param id: The id of message to remove from the list
     * @param pin: Whether message should be pinned or not
     */
    public void pinMessage(int id, boolean pin) {
        Message currentMessage = messages;
        Message firstMessage = messages;

        do {

            /* Message is found */
            if (currentMessage.getId() == id) {
                currentMessage.setPinned(pin);
                return;
            }

            /* Next message */
            currentMessage = currentMessage.getNext();

        } while (currentMessage != firstMessage);
    }

    /*
     * Reads all the messages contain within the message list and
     * stores it into a string, with the messages being separated by
     * a single newline character.
     *
     * @return String: A line separated string of all the messages in chat.
     */
    public String printMessageHistory() {
        StringBuilder buffer = new StringBuilder();
        Message currentMessage = messages;
        Message firstMessage = messages;

        do {

            /* Append Message to String */
            buffer.append(currentMessage.getContent());
            buffer.append('\n');

            /* Next message */
            currentMessage = currentMessage.getNext();

        } while (currentMessage != firstMessage);

        return buffer.toString();
    }

    /*
     * Will check if user sent 15 messages in the last minute.
     * If they have sent 15 messages in the last minute, they are spamming.
     * 
     * @return Boolean : True if the user is spamming, False otherwise
     */

    public boolean isSpamming() {
        Message lastMessage = messages.getPrev();
        Person currentUser = messages.getPrev().getSender(); // Last message sender
        int count = 0;
        int threshold = 5;

        Message prevMessage; // Declare prevMessage variable outside of the loop
        do {
            prevMessage = lastMessage.getPrev(); // Assign value to prevMessage
            if (prevMessage.getSender() != currentUser) { // Break if the sender is different
                break;
            }
            TimeBlock thisTime = prevMessage.getTimestamp(); // Get the timestamp of the previous message
            TimeBlock prevTime = prevMessage.getPrev().getTimestamp(); // Get the timestamp of the message before the previous message
            if (thisTime.getDay() == prevTime.getDay() && thisTime.getHour() == prevTime.getHour() && thisTime.getMinute() == prevTime.getMinute()) {
                count++; 
                System.out.println(count);
            } else {
                break;
            }
            prevMessage = prevMessage.getPrev(); // Move to the previous message
        } while (count < threshold); // Repeat until the count reaches the threshold

        return count <= threshold;
    }
    /*------------------------ GETTERS & SETTERS ------------------------*/

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<Person> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<Person> members) {
        this.members = members;
    }

    public Message getMessages() {
        return messages;
    }

    public void setMessages(Message messages) {
        this.messages = messages;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", members=" + members +
                ", messages=" + messages +
                '}';
    }
    public static void main(String[] args) {
        Chat chat = new Chat();
        Person person1 = new Person();
        person1.setName("Alice");
        Person person2 = new Person();
        ArrayList<Person> members = new ArrayList<>();
        members.add(person1);
        members.add(person2);
        chat.setMembers(members);
        Message message1 = new Message();
        message1.setId(1);
        message1.setSender(person1);
        message1.setContent("Hello");
        message1.setPinned(false);
        //int hour, int minute, int month, int day, int year, int timezone  
        TimeBlock timeBlock = new TimeBlock(1, 1, 1, 1, 2021, 0);
        message1.setTimestamp(timeBlock);
        chat.sendMessage(message1);
        Message message2 = new Message();
        message2.setId(2);
        message2.setSender(person1);
        message2.setContent("Hi");
        message2.setPinned(false);
        message2.setTimestamp(new TimeBlock(1, 1, 1, 1, 2021, 0));
        chat.sendMessage(message2);
        Message message3 = new Message();
        message3.setId(3);
        message3.setSender(person1);
        message3.setContent("Hey");
        message3.setPinned(false);
        message3.setTimestamp(new TimeBlock(1, 1, 1, 1, 2021, 0));
        chat.sendMessage(message3);
        Message message4 = new Message();
        message4.setId(4);
        message4.setSender(person1);
        message4.setContent("Hola");
        message4.setPinned(false);
        chat.sendMessage(message4);
        message4.setTimestamp(new TimeBlock(1, 1, 1, 1, 2021, 0));
        Message message5 = new Message();
        message5.setId(5);
        message5.setSender(person1);
        message5.setContent("Bonjour");
        message5.setPinned(false);
        message5.setTimestamp(new TimeBlock(1, 1, 1, 1, 2021, 0));
        chat.sendMessage(message5);

        System.out.println(chat.printMessageHistory());
        System.out.println(chat.isSpamming());
    }
}
