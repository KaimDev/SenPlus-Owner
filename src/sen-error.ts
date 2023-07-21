import { Chat, ISenError, codeSenErrorType, timeType } from "./types";

export class SenError implements ISenError {
  code: codeSenErrorType;
  timestamp: timeType;
  message: string;
  chat?: Chat;

  constructor(code: codeSenErrorType, timestamp: number, message: string, chat?: Chat) {
    const date: Date = new Date(timestamp * 1000);

    this.code = code;
    this.timestamp = `${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}`;
    this.message = message;

    if (typeof chat !== "undefined") {
      this.chat = chat;
    }
  }
}
