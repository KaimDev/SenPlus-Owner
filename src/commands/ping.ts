import TelegramBot from "node-telegram-bot-api";
import { User } from "../models/user.interface";

function ping(bot: TelegramBot, user: User): void {
    bot.sendMessage(user.chatId, "Pong!");
}

module.exports = ping;