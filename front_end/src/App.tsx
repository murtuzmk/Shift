import { Outlet } from "react-router-dom";
import { NavbarApp } from "./components/NavbarApp";
import { Sidebar } from "./components/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return isAuthenticated ? (
    <>
      <NavbarApp />
      <main className="flex h-[calc(100%-72px)]">
        <Sidebar />
        <div className="flex flex-1 justify-center items-center font-semibold text-2xl bg-gray-300">
          <Outlet context={{ user }} />
        </div>
      </main>
    </>
  ) : (
    <h1>You need to be logged in to see your info</h1>
  );
}

export default App;
