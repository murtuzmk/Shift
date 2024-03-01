package com.shiftbackend.shiftbackend;


public class Message {

    /* ------------------------ VARIABLES ------------------------ */

    private int id = -1;
    private Person sender = null;
    private String content = null;
    private TimeBlock timestamp = null;
    private boolean pinned = false;
    private Message prev = null;
    private Message next = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public Message() {}

    public Message(int id, Person sender, String content, TimeBlock timestamp, boolean pinned, Message prev, Message next) {
        this.id = id;
        this.sender = sender;
        this.content = content;
        this.timestamp = timestamp;
        this.pinned = pinned;
        this.prev = prev;
        this.next = next;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Person getSender() {
        return sender;
    }

    public void setSender(Person sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }

    public TimeBlock getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(TimeBlock timestamp) {
        this.timestamp = timestamp;
    }

    public Message getPrev() {
        return prev;
    }

    public void setPrev(Message prev) {
        this.prev = prev;
    }

    public Message getNext() {
        return next;
    }

    public void setNext(Message next) {
        this.next = next;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return "Message{" +
                "sender=" + sender +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                ", prev=" + prev +
                ", next=" + next +
                '}';
    }
}