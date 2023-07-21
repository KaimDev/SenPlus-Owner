import TelegramBot, { Message } from "node-telegram-bot-api";
import { MessageLog, OwnerLog } from "../types";

export async function sendLog(
  bot: TelegramBot,
  chatId: number,
  message: Message
) {
  const id = message.chat.id;
  let username = message.chat.username;
  let timestamp: number = message.date;

  const date: Date = new Date(timestamp * 1000); // Convert to milliseconds by multiplying by 1000
  const formattedDate: string = date.toLocaleDateString(); // Get the formatted date string
  const hours = date.getHours(); // Get the hours (0-23)
  const minutes = date.getMinutes(); // Get the minutes (0-59)

  const messageLog: MessageLog = {
    text: message.text!,
    messageId: message.message_id,
    date: formattedDate,
    time: `${hours}:${minutes}`,
  };

  if (typeof username === "undefined") {
    username = "Doesn't have";
  }

  const log: OwnerLog = {
    chatId: id,
    username: username,
    message: messageLog,
  };

  bot.sendMessage(chatId, `${JSON.stringify(log, null, 2)}`);
}
