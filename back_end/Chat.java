public class Chat {

    private int id = 0;
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
}