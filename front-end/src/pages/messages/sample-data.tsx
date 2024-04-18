import {
  bonnieGreen,
  jeseLeos,
  michealGouch,
  neilSims,
  robertaCasas,
} from "@/assets";

export const userData = [
  {
    id: 1,
    avatar: bonnieGreen,
    messages: [
      {
        id: 1,
        avatar: bonnieGreen,
        name: "Bonnie Green",
        message: "Hey, Jese",
      },
      {
        id: 2,
        avatar: jeseLeos,
        name: "Jese Leos",
        message: "Hey!",
      },
      {
        id: 3,
        avatar: bonnieGreen,
        name: "Bonnie Green",
        message: "How are you?",
      },
      {
        id: 4,
        avatar: jeseLeos,
        name: "Jese Leos",
        message: "I am good, you?",
      },
      {
        id: 5,
        avatar: bonnieGreen,
        name: "Bonnie Green",
        message: "I am good too!",
      },
      {
        id: 6,
        avatar: jeseLeos,
        name: "Jese Leos",
        message: "That is good to hear!",
      },
      {
        id: 7,
        avatar: bonnieGreen,
        name: "Bonnie Green",
        message: "How has your day been so far?",
      },
      {
        id: 8,
        avatar: jeseLeos,
        name: "Jese Leos",
        message:
          "It has been good. I went for a run this morning and then had a nice breakfast. How about you?",
      },
      {
        id: 9,
        avatar: bonnieGreen,
        name: "Bonnie Green",
        message: "I had a relaxing day. Just catching up on some reading.",
      },
    ],
    name: "Bonnie Green",
  },
  {
    id: 2,
    avatar: michealGouch,
    name: "Micheal Gouch",
  },
  {
    id: 3,
    avatar: neilSims,
    name: "Neil Sims",
  },
  {
    id: 4,
    avatar: robertaCasas,
    name: "Roberta Casas",
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: jeseLeos,
  name: "Jese Leos",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
