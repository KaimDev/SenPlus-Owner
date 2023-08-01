import TelegramBot from "node-telegram-bot-api";
import { createUser } from "../utils/create-user";
import { User } from "../models/user.interface";

function help(bot: TelegramBot, user: User): void {
    bot.sendMessage(user.chatId, "Hi there!");
    createUser(user);
}

module.exports = help;