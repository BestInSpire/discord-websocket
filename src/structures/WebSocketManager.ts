import WebSocket from "ws";
import EventEmitter from "node:events";
import { Hello, Heartbeat, Identify } from "../constants/Payloads";
import { Constants, OPCODE } from "../constants/Constants";
import superagent from "superagent";
import { id, token } from "../config";
import { Message } from "../interfaces/Payloads";

export class Client extends EventEmitter {
  constructor() {
    super();
    this.on = this.on;
    this.emit = this.emit;
  }

  public async connect(token: string) {
    try {
      const GATEWAY = Constants.GATEWAY;
      let interval: NodeJS.Timer;
      const socket = new WebSocket(GATEWAY, {
        perMessageDeflate: false,
      });
      socket.on("open", async () => {
        socket.send(JSON.stringify(Identify(token)));
      });
      socket.on("message", async (data: string) => {
        const parsedData = JSON.parse(data);
        const { t, event, op, d } = parsedData;

        switch (op) {
          case OPCODE.TEN:
            const { heartbeat_interval } = d;
            interval = heartbeat(socket, heartbeat_interval);
            break;
        }

        switch (t) {
          case "MESSAGE_CREATE":
            this.emit("messageCreate", messageCreate(d));
            break;
          case "READY":
            this.emit("ready");
            break;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const heartbeat = (socket: WebSocket, ms: number) => {
  return setInterval(() => {
    socket.send(JSON.stringify({ op: 2, d: null }));
  }, ms);
};
const messageCreate = (d: any) =>
  <Message>{
    content: d.content,
    author: d.author,
    timestamp: d.timestamp,
    pinned: d.pinned,
    mentions: {
      roles: d.mention_roles,
      users: d.mentions,
    },
    member: d.member,
    id: d.id,
    components: d.components,
    channel: {
      id: d.channel_id,
      send: (message: string) => {
        if(message.length > 2000) throw new RangeError("Messages must not exceed 2000 characters");
        return new Promise((resolve, reject) => {
          superagent
          .post(`https://discordapp.com/api/v9/channels/${d.channel_id}/messages`)
          .set("Authorization", "Bot " + token)
          .send({content: message})
          .then(response => resolve(response))
          .catch(error => reject(error))
        })
      },
    },
    attachments: d.attachments,
  };
