import TelegramBot from "node-telegram-bot-api";

function help(bot: TelegramBot, chatId: number): void {
    bot.sendMessage(chatId, "Help!");
}

module.exports = help;