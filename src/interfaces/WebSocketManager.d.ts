import EventEmitter from "node:events";
export interface WebSocketManager {
    connect(token:string):Promise<void>;
    myEventEmitter: EventEmitter;
}