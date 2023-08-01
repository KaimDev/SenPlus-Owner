import TelegramBot from "node-telegram-bot-api";
import { User } from "../models/user.interface";

function help(bot: TelegramBot, user: User): void {
    bot.sendMessage(user.chatId, "Help!");
}

module.exports = help;