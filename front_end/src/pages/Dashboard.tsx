const Dashboard = () => {
  return (
    <div className="bg-gray-100 flex-1 p-4 flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Welcome, User! 👋</h1>
        <p className="text-base">Welcome back, track your shifts here!</p>
      </div>
      <div className="flex justify-center items-center flex-1 bg-gray-200 rounded-lg border-dashed border-2 border-gray-300">
        Content
      </div>
    </div>
  );
};

export default Dashboard;
