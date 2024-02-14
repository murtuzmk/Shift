public class Message {

    private Person sender = null;
    private TimeBlock timestamp = null;
    private Message messagePrev = null;
    private Message messageNext = null;

    public Message() {}

    public Message(Person sender, TimeBlock timestamp, Message messagePrev, Message messageNext) {
        this.sender = sender;
        this.timestamp = timestamp;
        this.messagePrev = messagePrev;
        this.messageNext = messageNext;
    }
}