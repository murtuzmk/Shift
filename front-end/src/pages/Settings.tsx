import { Button, FormControl, FormLabel, Image, Input } from "@chakra-ui/react";
import { useUser } from "../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import UserDataContext from "../context/UserDataContext";

const Settings = () => {
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
    <div className="flex-1">
      <h1 className="text-2xl font-bold px-4 pt-4 bg-gray-100">
        User Settings
      </h1>
      <div className="bg-gray-100 p-4 grid grid-cols-8 grid-rows-6 gap-4">
        <div className="bg-gray-50 rounded-lg col-span-3 row-span-1 p-6 flex gap-4 shadow-sm shadow-gray-300">
          <Image
            objectFit="cover"
            src={user?.picture}
            alt={user?.name}
            className="size-28 rounded-lg"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-extrabold">{user?.name}</h1>
            <p className="text-gray-500">{userRole}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg shadow-sm shadow-gray-300 col-span-5 row-span-3 p-6 flex flex-col justify-between gap-3">
          <h1 className="text-xl font-extrabold">General Information</h1>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder={user?.name}
                className="text-gray-900 !text-sm !bg-gray-50 !border !border-gray-300 focus:!ring-4"
              />
            </FormControl>
          </div>
          <Button className="!bg-blue-700 hover:!bg-blue-800 focus:ring-4 !font-semibold !text-base !text-white w-fit">
            Save changes
          </Button>
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-3 row-span-2">
          Calendar Integrations
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-3 row-span-2">
          Notifications
        </div>
        <div className="bg-gray-50 rounded-lg border-dashed border-2 border-gray-300 col-span-5 row-span-2">
          Password Information
        </div>
      </div>
    </div>
  );
};

export default Settings;
