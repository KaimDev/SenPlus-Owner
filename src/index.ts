import TelegramBot = require("node-telegram-bot-api");
import { Message } from "node-telegram-bot-api";
import { BotToken, Command } from "./types";
require("dotenv").config();

// Replace 'YOUR_BOT_TOKEN' with your own bot token
const botToken: BotToken = process.env.TOKEN;

console.log(`TOKEN: ${botToken}`);

// if (!botToken) {
//   throw new Error("Token is missing");
// }

const bot: TelegramBot = new TelegramBot(botToken!, { polling: true });

console.log("Bot On");

// Set the bot commands
bot.setMyCommands([
  { command: 'start', description: 'Start the bot' },
  { command: 'help', description: 'Get Help' },
  { command: 'ping', description: "Ping Pong" },
]);

bot.on("message", (message: Message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (!text) {
    throw new Error("Text is missing");
  }
  
  // COMMAND HANDLER
  if (text === "/start") {
    bot.sendMessage(chatId, "Hi there!");
  } else if (text[0] === "/") {
    try {
      // Extract the command name without ("/")
      const commandName = text.slice(1).toLowerCase();
      const executeCommand: Command = require(`./commands/${commandName}.js`);
      executeCommand(bot, chatId);
    } catch (e) {
      bot.sendMessage(chatId, `${text} is not a valid command`);
      console.log(e);
    }
  } else {
    bot.sendMessage(chatId, `You said: ${text}`);
  }
});
