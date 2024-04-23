import {
  Button,
  ChakraProvider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import UserDataContext from "../context/UserDataContext";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { VerifiedUser } from "@/types";

const Settings = () => {
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const { getUserRole }: any = useContext(UserDataContext);
  const [userRole, setUserRole] = useState("Loading...");
  const { mutate, isLoading } = useLogout();
  
  useEffect(() => {
    if (userData) {
      setUser(userData as VerifiedUser);
    }
    user &&
      (async () => {
        setUserRole(await getUserRole(user?.sub));
      })();
  }, [user, userData]);

  const handleConfirmation = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      await mutate();
    }
  }

  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold px-4 pt-4 text-foreground">
        User Settings
      </h1>
      <div className="bg-background p-4 grid grid-cols-8 grid-rows-6 gap-4">
        <div className="bg-background rounded-lg col-span-3 row-span-1 p-6 flex gap-4 shadow-sm shadow-secondary">
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
        <div className="bg-background rounded-lg shadow-sm shadow-secondary col-span-5 row-span-3 p-6 flex flex-col justify-between gap-3">
          <h1 className="text-xl font-extrabold">General Information</h1>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder={user?.name}
                className="text-foreground !text-sm !bg-gray-50 !border !border-gray-300 focus:!ring-4"
              />
            </FormControl>

            <FormControl>
              <FormLabel> Notification Preference</FormLabel>
              <Select
                placeholder="Select Option"
                className="text-gray-900 !text-sm !bg-gray-50 !border !border-gray-300 focus:!ring-4">
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Both</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Notification Times</FormLabel>
              <Select
                placeholder="Select Option"
                className="text-gray-900 !text-sm !bg-gray-50 !border !border-gray-300 focus:!ring-4">
                <option value="1 Day">1 Day Prior</option>
                <option value="3 Days">3 Days Prior</option>
                <option value="1 Week">1 Week Prior</option>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-row">
            <Button className="!bg-blue-700 hover:!bg-blue-800 focus:ring-4 !font-semibold !text-base !text-white w-fit p-2">
              Save changes
            </Button>
            <Button className="!bg-red-600 hover:!bg-red-800 focus:ring-4 !font-semibold !text-base !text-white w-fit p-2 ml-96"
                onClick={handleConfirmation}>
              Delete Account
            </Button>
          </div>
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
