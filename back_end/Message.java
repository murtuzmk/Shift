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

    public Person getSender() {
        return sender;
    }

    public void setSender(Person sender) {
        this.sender = sender;
    }

    public TimeBlock getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(TimeBlock timestamp) {
        this.timestamp = timestamp;
    }

    public Message getMessagePrev() {
        return messagePrev;
    }

    public void setMessagePrev(Message messagePrev) {
        this.messagePrev = messagePrev;
    }

    public Message getMessageNext() {
        return messageNext;
    }

    public void setMessageNext(Message messageNext) {
        this.messageNext = messageNext;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Message{" +
                "sender=" + sender +
                ", timestamp=" + timestamp +
                ", messagePrev=" + messagePrev +
                ", messageNext=" + messageNext +
                '}';
    }
}