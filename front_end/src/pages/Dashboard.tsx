import { useUser } from "../hooks/useUser";
import MyCalendar from "../components/MyCalendar";

// This is the overview page where user can
export const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="text-2xl font-semibold flex justify-center items-center h-full">
      {user ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>Username: {user.name}</h2>
          <p>Email: {user.email}</p>
          <MyCalendar />
        </div>
      ) : (
        <h1>Dashboard</h1>
      )}
    </div>
  );
};
