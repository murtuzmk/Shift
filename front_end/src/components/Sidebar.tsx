import { Button, Icon } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="bg-gray-50 border-b-2 border-gray-300 w-64 flex flex-col justify-between items-center font-semibold text-2xl">
      <div className="p-5 w-full flex flex-col gap-4 font">
        <Button
          justifyContent="flex-start"
          px="0.75rem"
          width="100%"
          leftIcon={
            <Icon as={MdDashboard} h={5} w={5} className="fill-gray-600" />
          }
          colorScheme="gray"
          fontSize="1rem"
          fontWeight="500"
          size="lg"
          onClick={() => {
            navigate("/app/dashboard");
            // Perform any action on button click, e.g., submit the input value
          }}
        >
          Dashboard
        </Button>
        <Button
          justifyContent="flex-start"
          px="0.75rem"
          width="100%"
          leftIcon={
            <Icon as={MdDashboard} h={5} w={5} className="fill-gray-600" />
          }
          colorScheme="gray"
          fontSize="1rem"
          fontWeight="500"
          size="lg"
          onClick={() => {
            navigate("/app/availability");
            // Perform any action on button click, e.g., submit the input value
          }}
        >
          Availability
        </Button>
        <Button
          justifyContent="flex-start"
          px="0.75rem"
          width="100%"
          leftIcon={
            <Icon as={MdDashboard} h={5} w={5} className="fill-gray-600" />
          }
          colorScheme="gray"
          fontSize="1rem"
          fontWeight="500"
          size="lg"
          onClick={() => {
            navigate("/app/executivepage");
            // Perform any action on button click, e.g., submit the input value
          }}
        >
          Executive
        </Button>
        <Button
          justifyContent="flex-start"
          px="0.75rem"
          width="100%"
          leftIcon={
            <Icon as={MdDashboard} h={5} w={5} className="fill-gray-600" />
          }
          colorScheme="gray"
          fontSize="1rem"
          fontWeight="500"
          size="lg"
          onClick={() => {
            navigate("/app/settings");
            // Perform any action on button click, e.g., submit the input value
          }}
        >
          Settings
        </Button>
      </div>
      <div>
        <p>icons</p>
      </div>
    </aside>
  );
};
