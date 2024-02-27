import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@chakra-ui/react";
import { HiMiniBars3 } from "react-icons/hi2";

export const NavbarApp = () => {
  const { logout } = useAuth0();
  return (
    <header className="bg-gray-50 py-3 px-5 flex justify-between gap-x-6 border-b-2 border-gray-300">
      <div className="hover:bg-gray-200 p-2 rounded-md">
        <Icon as={HiMiniBars3} w={6} h={6} />
      </div>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log out
      </button>
    </header>
  );
};
