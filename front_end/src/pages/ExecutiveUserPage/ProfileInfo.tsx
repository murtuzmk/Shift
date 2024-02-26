import Message from "./Message";
import ProfilePicture from "./ProfilePic";
import "./style/ProfileInfo.css";

function ProfileInfo() {
  return (
    <div>
      <ProfilePicture />
      <Message />
    </div>
  );
}
export default ProfileInfo;
