import TelegramBot from "node-telegram-bot-api";
import { User } from "./models/user.interface";

export type BotToken = string | undefined;

export type Command = (bot: TelegramBot, user: User) => void;

export type OwnerLog = {
  chatId: number;
  username?: string;
  message: MessageLog;
};

type MessageLog = {
  messageId: number;
  text: string;
  date: string;
  time: `${string}:${string}`;
};

// ERROR TYPES
export type codeTelegramErrorType = "EFATAL" | "EPARSE" | "ETELEGRAM";

export interface ITelegramError {
  code: codeTelegramErrorType
  value: string;
  response: TelegramResponse;
}

export type TelegramResponse = {
  body: string | TelegramErrorObject;
}

type TelegramErrorObject = {
  type: string | object;
}

// SEN ERROR TYPES
export type codeSenErrorType = "MESSAGE_TYPE" | "Undefined"
export type timeType = `${string} - ${string}:${string}`

export interface ISenError {
  code: codeSenErrorType;
  timestamp: timeType;
  message: string;
  chat?: Chat;
}

export type Chat = {
  chatId: number;
  messageId: number;
  username?: string;
}

// DTO
export interface IMessageDTO {
  text: string;
  chatId: number;
}