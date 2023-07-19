import TelegramBot from "node-telegram-bot-api";

function ping(bot: TelegramBot, chatId: number) {
    bot.sendMessage(chatId, "Pong!");
}

module.exports = ping;