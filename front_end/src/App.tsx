import { Outlet } from "react-router-dom";
import { NavbarApp } from "./components/NavbarApp";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <>
      <NavbarApp />
      <main className="flex h-[calc(100%-72px)]">
        <Sidebar />
        <div className="flex flex-1 justify-center items-center font-semibold text-2xl bg-gray-300">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default App;
