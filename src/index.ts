import { Client } from "./structures/WebSocketManager";
import { token } from "./config";
import { Message } from "./interfaces/Payloads";

const client = new Client();

client.on("messageCreate", (message: Message) => {
  if(message.content == "ping") {
    message.channel?.send("pong!")
  }
});

client.on("ready", () => {
  console.log('bot is active')
});

client.connect(token);
