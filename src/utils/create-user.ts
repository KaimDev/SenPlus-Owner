import { bot } from "..";
import { User } from "../models/user.interface";
import { sendLog } from "../owner/send-log";
require("dotenv").config();

export async function createUser({ chatId, username, role = "USER" }: User) {
  const url = process.env.SERVER_URL;
  const ownerChat = process.env.OWNER_CHAT!;
  const endpoint = "/user";

  const data: User = {
    chatId,
    username,
    role,
  };

  fetch(url + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => console.log(response.status, response.statusText))
    .then(() => {
      bot.sendMessage(ownerChat, `NEW USER WAS CREATED\n ${JSON.stringify(data), null, 2}`);
    })
    .catch((error) => {
      console.error(error);
    });
}
