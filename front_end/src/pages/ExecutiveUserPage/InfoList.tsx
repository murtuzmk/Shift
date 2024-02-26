import { useUser } from "../../hooks/useUser";
function InfoList() {
  const { user } = useUser();
  <img src="" alt="" />;
  /* Import this specific info from backend later*/
  const items = [
    "RA @ Cary Quadrangle",
    "Username: EriSamson",
    "Password: **********",
  ];

  items.map((item) => <li>{item}</li>);
  return (
    <>
      <h1> User Info </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default InfoList;
