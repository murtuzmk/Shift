import { Button, Icon } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";
import { HiCalendar, HiMiniInboxArrowDown } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 w-64 border-r border-gray-300 flex flex-col gap-3">
      <div className="flex flex-col p-3 gap-3">
        <Button
          leftIcon={
            <Icon
              as={MdSpaceDashboard}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
          onClick={() => navigate("dashboard")}
        >
          Dashboard
        </Button>
        <Button
          leftIcon={
            <Icon
              as={HiCalendar}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
        >
          Schedule
        </Button>
        <Button
          leftIcon={
            <Icon
              as={HiMiniInboxArrowDown}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
        >
          Messages
        </Button>
      </div>
      {/* Separator */}
      <div className="border-b border-gray-300 mx-3"></div>
      <div className="flex flex-col p-3 gap-3">
        <Button
          leftIcon={
            <Icon
              as={FaGear}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
          onClick={() => navigate("settings")}
        >
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
