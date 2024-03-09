import { useContext, useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { useUser } from "../hooks/useUser";
import UserDataContext from "../context/UserDataContext";

const Dashboard = () => {
  const { user } = useUser();
  const { getUserRole }: any = useContext(UserDataContext);
  const [userRole, setUserRole] = useState("Loading...");

  useEffect(() => {
    user &&
      (async () => {
        setUserRole(await getUserRole(user?.sub));
      })();
  }, [user]);
  return (
    <div className="bg-gray-100 flex-1 p-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}! 👋</h1>
        <p className="text-base">Role: {userRole}</p>
        <p className="text-base">Welcome back, track your shifts here!</p>
      </div>
      <div className="flex-1 rounded-lg grid grid-cols-8 grid-rows-6 gap-4">
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 1
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 2
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 3
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-2 row-span-1">
          Statistic 4
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-5 row-span-4 p-6 flex flex-col gap-3">
          <h1 className="text-xl font-extrabold">General Information</h1>
          
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Import
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Export
            </button>
          </div>
          <MyCalendar />
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-3 row-span-3">
          Co-workers
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
