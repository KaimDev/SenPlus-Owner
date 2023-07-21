import TelegramBot = require("node-telegram-bot-api");
import { Message } from "node-telegram-bot-api";
import { BotToken, Chat, Command, ISenError, ITelegramError } from "./types";
import { sendLog } from "./owner/send-log";
import { Server } from "./server";
import { setCommands } from "./commands/set-commands";
import { SenError } from "./sen-error";
import { replyMessage } from "./utils/reply-message";
require("dotenv").config();

const botToken: BotToken = process.env.TOKEN;
const owner: string | undefined = process.env.OWNER;
const oChat: string | undefined = process.env.OWNER_CHAT;

const handleExit = async (chatId?: number | undefined): Promise<never> => {
  console.log("Turning off");

  if (typeof chatId !== "undefined") {
    await bot.sendMessage(ownerChat, "Turning off");
  }

  process.exit();
};

// Register the 'SIGINT' and 'SIGTERM' events
process.on("SIGINT", handleExit);
process.on("SIGTERM", handleExit);

if (typeof botToken === "undefined") {
  console.error("Token is missing");
  handleExit();
}

if (typeof owner === "undefined") {
  console.error(`The owner is undefined, Owner functions are disabled`);
}

if (typeof oChat === "undefined") {
  console.error("The owner chat is undefined");
  handleExit();
}

const bot: TelegramBot = new TelegramBot(botToken!, { polling: true });

const ownerChat: number = parseInt(oChat!);

console.log("Bot On");

bot.sendMessage(ownerChat, "Online").catch((error) => {
  console.log(error.code); // => 'ETELEGRAM'
  console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
});

// Set the bot commands
setCommands(bot);

bot.on("message", (message: Message) => {
  const chatId = message.chat.id;
  const text = message.text;

  try {

    if (!text) {
      const chat: Chat = {
        chatId: chatId,
        username: message.chat.username,
        messageId: message.message_id,
      };
      throw new SenError(
        "MESSAGE_TYPE",
        message.date,
        "Is not a text",
        chat
      );
    }

    // COMMAND HANDLER
    if (text === "/start") {
      bot.sendMessage(chatId, "Hi there!");
    } else if (text[0] === "/") {
      // Extract the command name without ("/")
      const commandName = text.slice(1).toLowerCase();
      const executeCommand: Command = require(`./commands/${commandName}.js`);
      executeCommand(bot, chatId);
    } else {
      bot.sendMessage(chatId, `You said: ${text}`);
    }

    console.log(chatId);
    console.log(message.chat.username);
    console.log(text);

    // Send Log
    if (typeof message.text !== "undefined") {
      sendLog(bot, ownerChat, message);
    }

  } catch (error: unknown) {
    if (isSenError(error)) {
      const senError = error as ISenError;
      console.error(senError);
      if (senError.code === "MESSAGE_TYPE") {
        replyMessage(
          bot,
          senError.chat!.chatId,
          "Invalid message",
          senError.chat!.messageId
        );
        bot.sendMessage(ownerChat, `ERROR: ${JSON.stringify(senError, null, 2)}`);
      }
    } else if (isTelegramError(error)) {
      const telegramError = error as ITelegramError;
      if (telegramError.code === "ETELEGRAM") {
        console.log(telegramError.code);
        console.log(telegramError.response.body);
      }
    } else {
      console.error("ERROR: MODULE_NOT_FOUND");
      bot.sendMessage(chatId, `${text} is not a valid command`);
    }
  }
});

function isSenError(error: unknown): error is ISenError {
  return (error as ISenError).message !== undefined;
}

function isTelegramError(error: unknown): error is ITelegramError {
  return (error as ITelegramError).response !== undefined;
}

// Server On
Server();
