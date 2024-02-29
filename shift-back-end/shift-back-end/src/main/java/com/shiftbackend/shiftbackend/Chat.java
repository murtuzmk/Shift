package com.shiftbackend.shiftbackend;


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
}