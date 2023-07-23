import { bot } from "..";

export function sendMessage(
  chatId: number,
  message: string,
): void {
  bot.sendMessage(chatId, message);
}
