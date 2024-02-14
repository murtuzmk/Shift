public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    private ResidentEducationAssistant[] reaAccounts = null;

    public ResidentEducationCoordinator() {}

    public ResidentEducationCoordinator(ResidentEducationAssistant[] reaAccounts) {
        this.reaAccounts = reaAccounts;
    }

    public ResidentEducationAssistant[] getReaAccounts() {
        return reaAccounts;
    }

    public void setReaAccounts(ResidentEducationAssistant[] reaAccounts) {
        this.reaAccounts = reaAccounts;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "ResidentEducationCoordinator{" +
                "reaAccounts=" + java.util.Arrays.toString(reaAccounts) +
                '}';
    }
}