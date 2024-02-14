public class ResidentEducationCoordinator extends ResidentEducationAssistant {

    private ResidentEducationAssistant[] reaAccounts = null;

    public ResidentEducationCoordinator() {}

    public ResidentEducationCoordinator(ResidentEducationAssistant[] reaAccounts) {
        this.reaAccounts = reaAccounts;
    }
}