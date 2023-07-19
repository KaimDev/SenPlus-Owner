import TelegramBot from "node-telegram-bot-api";

export type BotToken = string | undefined;

export type Command = (bot: TelegramBot, chatId: number) => void;

export type MessageLog = {
  messageId: number;
  text: string;
  date: string;
  time: `${string}:${string}`;
};

export type OwnerLog = {
  chatId: number;
  username?: string;
  message: MessageLog;
};
