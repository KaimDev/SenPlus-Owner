import TelegramBot from "node-telegram-bot-api";
import { User } from "../models/user.interface";

function task(bot: TelegramBot, user: User): void {
    const message: string = "Scheduled Task in developing, the format required should be DD/MM/YYYY HH:mm";
    bot.sendMessage(user.chatId, message);
}

module.exports = task;