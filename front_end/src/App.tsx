import { useAuth0 } from "@auth0/auth0-react";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarApp from "./components/NavbarApp";
import Sidebar from "./components/Sidebar";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <ChakraProvider>
      {isAuthenticated && user ? (
        <div className="h-full flex flex-col">
          <NavbarApp />
          <div className="flex flex-1">
            <Sidebar />
            <Outlet context={{ user }} />
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col gap-6 justify-center items-center">
          <h1 className="font-bold text-4xl">
            You have to be logged in to see that.
          </h1>
          <Button colorScheme="blue" onClick={() => navigate("/")} size="lg">
            Go home
          </Button>
        </div>
      )}
    </ChakraProvider>
  );
}

export default App;
