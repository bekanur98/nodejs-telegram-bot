const TelegramBot = require("node-telegram-bot-api");

const token = "6793417861:AAFa3WG9ONHCkzLZ7oWGXW4cPdafMzBISmo";

const bot = new TelegramBot(token, {polling: true});

try {
	bot.on("message", (msg: any) => {
		bot.sendMessage(msg.chat.id, "Hi")
	});	
} catch (e) {
	console.error(e);
}
