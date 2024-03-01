import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  return (
    <div className="h-full flex flex-col gap-6 justify-center items-center">
      <h1 className="font-bold text-4xl">This page does not exist.</h1>
      <Button
        onClick={() => (isAuthenticated ? navigate("/app") : navigate("/"))}
        size="lg"
        colorScheme="red"
      >
        Go home
      </Button>
    </div>
  );
};

export default ErrorPage;
