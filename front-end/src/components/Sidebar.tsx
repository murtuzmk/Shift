import { useAuth0 } from "@auth0/auth0-react";
import { Button, Icon } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaGear, FaUserPlus } from "react-icons/fa6";
import { HiCalendar, HiMiniInboxArrowDown } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import UserDataContext from "../context/UserDataContext";

const Sidebar = () => {
  const { user, isLoading } = useAuth0();
  const { getUserRole }: any = useContext(UserDataContext);
  const navigate = useNavigate();
  const [displayCAButton, setDisplayCAButton] = useState(false);
  useEffect(() => {
    user &&
      (async () => {

        /* 
         * THIS PART NEEDS OWRK DONE TO MAKE USER ROELS WORK
         *
         */

        //const userRole = getUserRole(user?.sub)//"Resident Education Assistant" //await getUserRole(user?.sub);
        const userRole = await getUserRole(user?.sub);
        console.log("ROle is " + userRole);
        if (
          userRole == "Resident Education Assistant" ||
          userRole == "Resident Education Coordinator"
        ) {
          setDisplayCAButton(true);
        }
      })();
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="!bg-gray-50 dark:!bg-slate-600 w-64 border-r border-gray-300 flex flex-col gap-3">
      <div className="flex flex-col p-3 gap-3">
        <Button
          leftIcon={
            <Icon
              as={MdSpaceDashboard}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
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
          className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
          onClick={() => navigate("availability")}
        >
           {displayCAButton ? "Shifts" : "Availability"}
        </Button>

      {displayCAButton && (
        <Button
          leftIcon={
            <Icon
              as={HiMiniInboxArrowDown}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
          onClick={() => navigate("executivepage")}
        >
          Executive
        </Button>
       )}
        <Button
          leftIcon={
            <Icon
              as={HiMiniInboxArrowDown}
              className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
          role="group"
        >
          Messages
        </Button>
        {displayCAButton && (
          <Button
            leftIcon={
              <Icon
                as={FaUserPlus}
                className="size-6 fill-gray-500 !w-5 !h-5 mr-2"
                _groupHover={{ fill: "gray.600" }}
              />
            }
            className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
            role="group"
            onClick={() => navigate("create-ra-account")}
          >
            Create RA Account
          </Button>
        )}
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
          className="!bg-gray-50 dark:!bg-slate-600 !text-black dark:!text-white hover:!bg-gray-200 focus:ring-4 !font-medium !text-base !px-3 !justify-start"
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
