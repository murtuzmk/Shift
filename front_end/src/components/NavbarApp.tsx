import {
  Avatar,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HiBell, HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { useAuth0 } from "@auth0/auth0-react";

const NavbarApp = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <nav className="bg-gray-50 p-3 flex items-center justify-between border-b border-gray-300">
      <div className="flex space-x-16 items-center">
        <IconButton
          aria-label="Sidebar"
          icon={
            <Icon
              as={HiMiniBars3CenterLeft}
              className="size-6 fill-gray-500 !w-6 !h-6"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4"
          role="group"
        />
        <InputGroup className="!w-96">
          <InputLeftElement
            pointerEvents="none"
            color="gray.500"
            fontSize="1.2em"
          >
            <Icon as={HiOutlineSearch} />
          </InputLeftElement>
          <Input
            placeholder="Search"
            fontSize="0.875rem"
            size="md"
            className="text-gray-900 !bg-gray-50 !border !border-gray-300 focus:!ring-4"
          />
        </InputGroup>
      </div>
      <div className="flex space-x-3 items-center">
        <IconButton
          aria-label="Notfications"
          icon={
            <Icon
              as={HiBell}
              className="size-6 fill-gray-500 !w-6 !h-6"
              _groupHover={{ fill: "gray.600" }}
            />
          }
          className="!bg-gray-50 hover:!bg-gray-200 focus:ring-4"
          role="group"
        />
        <Menu>
          {isAuthenticated && user ? (
            <MenuButton
              as={Avatar}
              name={user.name}
              src={user.picture}
              size="sm"
              className="cursor-pointer"
            />
          ) : (
            <MenuButton
              as={Avatar}
              size="sm"
              className="cursor-pointer"
              bg="blue.500"
            />
          )}

          <MenuList>
            {isAuthenticated && user && (
              <>
                <h1 className="px-4 pt-2 font-bold">{user.name}</h1>
                <h1 className="px-4 pt-1 pb-2 mb-2 font-medium">
                  {user.email}
                </h1>
              </>
            )}
            <MenuItem
              className="hover:bg-gray-100"
              bg="none"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Delete Account
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
};

export default NavbarApp;
