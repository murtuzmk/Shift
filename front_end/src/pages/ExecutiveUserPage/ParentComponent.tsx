import InfoList from "./InfoList";
import ProfileInfo from "./ProfileInfo";

function ParentComponent() {
  return (
    <div>
      <ProfileInfo />
      <InfoList />
    </div>
  );
}
export default ParentComponent;
