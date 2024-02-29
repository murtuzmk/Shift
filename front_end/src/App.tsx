import { useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import Sidebar from "./components/Sidebar";

function App() {
  const { user, isLoading } = useAuth0();
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <ChakraProvider>
      <div className="h-full flex flex-col">
        <NavbarApp />
        <div className="flex flex-1">
          <Sidebar />
          <Outlet context={{ user }} />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
