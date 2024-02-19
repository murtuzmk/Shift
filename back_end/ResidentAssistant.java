public class ResidentAssistant extends Person{

    /* ------------------------ VARIABLES ------------------------ */

    private String floor = null;
    private boolean clockedIn = false;
    private Schedule schedule = null;
    private Chat chats = null;

    /* ------------------------ CONSTRUCTORS ------------------------ */

    public ResidentAssistant() {}

    public ResidentAssistant(String floor, boolean clockedIn, Schedule schedule, Chat chats) {
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
    }

    public ResidentAssistant(String name, String email, String password, String id, Gender gender, Role role, Hall hall, boolean enabled, String floor, boolean clockedIn, Schedule schedule, Chat chats) {
        super(name, email, password, id, gender, role, hall, enabled);
        this.floor = floor;
        this.clockedIn = clockedIn;
        this.schedule = schedule;
        this.chats = chats;
    }

    /* ------------------------ FUNCTIONS ------------------------ */

    /*
     * Deletes the contents of all variables related to this class
     * and superclass and sets them to null.
     */
    @Override
    public void deleteAccount() {
        super.deleteAccount();
        floor = null;
        clockedIn = false;
        schedule = null;
        chats = null;
    }

    /*
     * Adds a chat the chats of the current resident assistant.
     * It will append it to the end of the doubly linked list of chats.
     *
     * @param inputChat: The chat to add to the list
     */
    public void addChat(Chat inputChat) {

        /* Check if list is empty */
        if (chats == null) {
            chats = inputChat;
            inputChat.setPrev(inputChat);
            inputChat.setNext(inputChat);
            return;
        }

        /* Append chat to end of list */
        Chat prevChat = chats.getPrev();
        Chat nextChat = chats;

        inputChat.setPrev(prevChat);
        inputChat.setNext(nextChat);
        prevChat.setNext(inputChat);
        nextChat.setPrev(inputChat);
    }

    /*
     * Removes chat from chats list of the current resident assistant.
     * It will not do anything if the given id does not exist
     * within the list.
     *
     * @param id: The id of chat to remove from the list
     */
    public void deleteChat(int id) {

        /* Check if list is empty */
        if (chats == null) {
            return;
        }

        /* Check if chat is the only one */
        if ((chats == chats.getNext()) && (chats.getId() == id)) {
            chats = null;
            return;
        }

        /* Search for chat in chat based on id */
        Chat currentChat = chats;
        Chat firstChat = chats;

        do {

            /* Chat is found */
            if (currentChat.getId() == id) {
                break;
            }

            /* Next Chat */
            currentChat = currentChat.getNext();

        } while (currentChat != firstChat);

        /* Chat not found */
        if (currentChat == firstChat) {
            return;
        }

        /* Chat found */
        Chat prevChat = currentChat.getPrev();
        Chat nextChat = currentChat.getNext();
        prevChat.setNext(nextChat);
        nextChat.setPrev(prevChat);
    }

    /*------------------------ GETTERS & SETTERS ------------------------*/

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public boolean isClockedIn() {
        return clockedIn;
    }

    public void setClockedIn(boolean clockedIn) {
        this.clockedIn = clockedIn;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
    }

    public Chat getChats() {
        return chats;
    }

    public void setChats(Chat chats) {
        this.chats = chats;
    }

    /*------------------------ TOSTRING ------------------------*/

    @Override
    public String toString() {
        return  super.toString() + "\n" +
                "ResidentAssistant{" +
                "floor='" + floor + '\'' +
                ", clockedIn=" + clockedIn +
                ", schedule=" + schedule +
                ", chats=" + chats +
                '}';
    }
}