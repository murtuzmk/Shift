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

const NavbarApp = () => {
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
          <MenuButton
            as={Avatar}
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="sm"
            className="cursor-pointer"
          />
          <MenuList>
            <MenuItem className="hover:bg-gray-100" bg="none">
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
};

export default NavbarApp;
