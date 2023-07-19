import TelegramBot = require("node-telegram-bot-api");
import { Message } from "node-telegram-bot-api";
import { BotToken, Command } from "./types";
import { sendLog } from "./owner/send-log";
require("dotenv").config();

// Replace 'YOUR_BOT_TOKEN' with your own bot token
const botToken: BotToken = process.env.TOKEN;
const owner: string | undefined = process.env.OWNER;
const oChat: string | undefined = process.env.OWNER_CHAT;

// console.log(`TOKEN: ${botToken}`);
console.log(`OWNER: ${owner}`);

if (typeof botToken === "undefined") {
  throw new Error("Token is missing");
}

if (typeof owner === "undefined") {
  console.error(`The owner is undefined, Owner functions are disabled`);
}

if (typeof oChat === "undefined") {
  console.error("The owner chat is undefined");
}

const bot: TelegramBot = new TelegramBot(botToken!, { polling: true });

const ownerChat: number = parseInt(oChat!);

console.log(ownerChat);

console.log("Bot On");

bot.sendMessage(ownerChat, "Online");

// Set the bot commands
bot.setMyCommands([
  { command: "start", description: "Start the bot" },
  { command: "help", description: "Get Help" },
  { command: "ping", description: "Ping Pong" },
]);

bot.on("message", (message: Message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (!text) {
    throw new Error("Text is missing");
  }

  console.log(chatId);
  console.log(message.chat.username);
  console.log(text);

  // Send Log
  if (typeof message.text !== "undefined") {
    sendLog(bot, ownerChat, message);
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

const handleExit = async (): Promise<never> => {
  console.log("Turning off");
  await bot.sendMessage(ownerChat, "Turning off");
  process.exit();
};

// Registra los eventos 'SIGINT' y 'SIGTERM'
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);