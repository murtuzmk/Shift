public class Chat {

    private int id = -1;
    private Person[] members = null;
    private boolean groupChat = false;
    private Message messages = null;
    private Chat chatPrev = null;
    private Chat chatNext = null;

    public Chat() {}

    public Chat(int id, Person[] members, boolean groupChat, Message messages, Chat chatPrev, Chat chatNext) {
        this.id = id;
        this.members = members;
        this.groupChat = groupChat;
        this.messages = messages;
        this.chatPrev = chatPrev;
        this.chatNext = chatNext;
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

    public Chat getChatPrev() {
        return chatPrev;
    }

    public void setChatPrev(Chat chatPrev) {
        this.chatPrev = chatPrev;
    }

    public Chat getChatNext() {
        return chatNext;
    }

    public void setChatNext(Chat chatNext) {
        this.chatNext = chatNext;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "Chat{" +
                "id=" + id +
                ", members=" + java.util.Arrays.toString(members) +
                ", groupChat=" + groupChat +
                ", messages=" + messages +
                ", chatPrev=" + chatPrev +
                ", chatNext=" + chatNext +
                '}';
    }
}