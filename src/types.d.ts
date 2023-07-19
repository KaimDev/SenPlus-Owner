import TelegramBot from "node-telegram-bot-api";

export type BotToken = string | undefined;

export type Command = (bot: TelegramBot, chatId: number) => void;