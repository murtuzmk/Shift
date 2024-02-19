const ProfilePicture = () => {
  return (
    <div
      style={{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "grey",
        borderStyle: "solid", // specify border style
      }}
    >
      <img
        src="blank_pfp.png"
        alt="Profile Picture Doesn't Exist"
        style={{
          width: "100%", // to make sure image fills the container
          height: "100%", // to make sure image fills the container
          objectFit: "cover", // to make sure image covers the whole container
        }}
      ></img>
    </div>
  );
};
export default ProfilePicture;
