import java.util.Arrays;

public class Chat {

    private int id = -1;
    private Person[] members = null;
    private boolean groupChat = false;
    private Message messages = null;
    private Chat prev = null;
    private Chat next = null;

    public Chat() {}

    public Chat(int id, Person[] members, boolean groupChat, Message messages, Chat prev, Chat next) {
        this.id = id;
        this.members = members;
        this.groupChat = groupChat;
        this.messages = messages;
        this.prev = prev;
        this.next = next;
    }

    public void sendMessage(Message inputMessage) {
        if (messages == null) {
            messages = inputMessage;
            return;
        }
        Message lastMessage = messages;
        while (lastMessage != null) {
            lastMessage = lastMessage.getNext();
        };
        lastMessage.setNext(inputMessage);
        inputMessage.setPrev(lastMessage);
    }

    public void deleteMessage(int id) {
        if (messages == null) {
            return;
        }
        Message currentMessage = messages;
        while (currentMessage != null) {
            if (currentMessage.getId() == id) {
                break;
            }
            currentMessage = currentMessage.getNext();
        }

        if (currentMessage == null) {
            return;
        }

        Message prevMessage = currentMessage.getPrev();
        Message nextMessage = currentMessage.getNext();

        if (prevMessage != null) {
            prevMessage.setNext(nextMessage);
        }
        if (nextMessage != null) {
            nextMessage.setPrev(prevMessage);
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Person[] getMembers() {
        return members;
    }

    public void setMembers(Person[] members) {
        this.members = members;
    }

    public boolean isGroupChat() {
        return groupChat;
    }

    public void setGroupChat(boolean groupChat) {
        this.groupChat = groupChat;
    }

    public Message getMessages() {
        return messages;
    }

    public void setMessages(Message messages) {
        this.messages = messages;
    }

    public Chat getPrev() {
        return prev;
    }

    public void setPrev(Chat prev) {
        this.prev = prev;
    }

    public Chat getNext() {
        return next;
    }

    public void setNext(Chat next) {
        this.next = next;
    }

    @Override
    public String toString() {
        return "Chat{" +
                "id=" + id +
                ", members=" + Arrays.toString(members) +
                ", groupChat=" + groupChat +
                ", messages=" + messages +
                ", prev=" + prev +
                ", next=" + next +
                '}';
    }
}