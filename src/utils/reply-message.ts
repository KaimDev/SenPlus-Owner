import TelegramBot from "node-telegram-bot-api";

export function replyMessage(
  bot: TelegramBot,
  chatId: number,
  message: string,
  messageId: number
): void {
  bot.sendMessage(chatId, message, {
    reply_to_message_id: messageId,
  });
}
