import TelegramBot from "node-telegram-bot-api";

export async function setCommands(bot: TelegramBot) {
  bot.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Get Help" },
    { command: "ping", description: "Ping Pong" },
  ]);
}
