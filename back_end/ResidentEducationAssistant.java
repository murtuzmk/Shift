public class ResidentEducationAssistant extends ResidentAssistant{

    private ResidentAssistant[] raAccounts = null;
    private Scheduler masterSchedule = null;

    public ResidentEducationAssistant() {}
    public ResidentEducationAssistant(ResidentAssistant[] raAccounts, Scheduler masterSchedule) {
        this.raAccounts = raAccounts;
        this.masterSchedule = masterSchedule;
    }

    public ResidentAssistant[] getRaAccounts() {
        return raAccounts;
    }

    public void setRaAccounts(ResidentAssistant[] raAccounts) {
        this.raAccounts = raAccounts;
    }

    public Scheduler getMasterSchedule() {
        return masterSchedule;
    }

    public void setMasterSchedule(Scheduler masterSchedule) {
        this.masterSchedule = masterSchedule;
    }

    @java.lang.Override
    public java.lang.String toString() {
        return "ResidentEducationAssistant{" +
                "raAccounts=" + java.util.Arrays.toString(raAccounts) +
                ", masterSchedule=" + masterSchedule +
                '}';
    }
}