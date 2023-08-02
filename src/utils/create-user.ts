import { bot } from "..";
import { User } from "../models/user.interface";
import axios from "axios";
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

  try {
    const response = await axios.post(url + endpoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.status, response.statusText);
    if (response.status === 201) {
      bot.sendMessage(
        ownerChat,
        `NEW USER WAS CREATED\n ${JSON.stringify(data, null, 2)}`
      );
    }
  } catch (error: any) {
    console.error(JSON.stringify(error.message, null, 2));
    bot.sendMessage(
      ownerChat,
      JSON.stringify(`REGISTER ERROR: ${error.message}`, null, 2)
    );
  }
}
