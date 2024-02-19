import "../sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        src="SHIFT_LOGO.PNG"
        width={250}
        height={150}
        alt="Shift Picture Unavailable"
      />
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>
  );
}
export default SideBar;
