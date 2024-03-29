import { avatar1, avatar2, avatar3, avatar4 } from "@/assets";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EmployeeColumns } from "@/pages/Employees";
import React from "react";

export const employees: EmployeeColumns[] = [
  {
    id: "728ed52f",
    residentAssistant: {
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      avatar: React.createElement(
        Avatar,
        { className: "h-12 w-12" },
        React.createElement(AvatarImage, {
          src: avatar2,
        })
      ),
    },
    role: "Resident Assistant",
    hall: "Cary Quad",
    status: "Clocked In",
  },
  {
    id: "1a3b4c5d",
    residentAssistant: {
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      avatar: React.createElement(
        Avatar,
        { className: "h-12 w-12" },
        React.createElement(AvatarImage, {
          src: avatar3,
        })
      ),
    },
    role: "Resident Assistant",
    hall: "Cary Quad",
    status: "Clocked Out",
  },
  {
    id: "6e7f8g9h",
    residentAssistant: {
      name: "Clementine Bauch",
      email: "Nathan@yesenia.net",
      avatar: React.createElement(
        Avatar,
        { className: "h-12 w-12" },
        React.createElement(AvatarImage, {
          src: avatar1,
        })
      ),
    },
    role: "Resident Assistant",
    hall: "Cary Quad",
    status: "Clocked In",
  },
  {
    id: "0i9j8k7l",
    residentAssistant: {
      name: "Patricia Lebsack",
      email: "Julianne.OConner@kory.org",
      avatar: React.createElement(
        Avatar,
        { className: "h-12 w-12" },
        React.createElement(AvatarImage, {
          src: avatar4,
        })
      ),
    },
    role: "Resident Assistant",
    hall: "Cary Quad",
    status: "Clocked In",
  },
];
